import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// GET single workflow
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Workflow } = await import("@/models/Workflow")

    await dbConnect()

    const workflow = await Workflow.findOne({
      _id: params.id,
      userId: decoded.userId,
    })

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        workflow,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get workflow error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// UPDATE workflow
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const updates = await request.json()

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Workflow } = await import("@/models/Workflow")

    await dbConnect()

    const workflow = await Workflow.findOneAndUpdate(
      {
        _id: params.id,
        userId: decoded.userId,
      },
      updates,
      { new: true, runValidators: true },
    )

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 })
    }

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: decoded.userId,
      action: "workflow.update",
      description: `Updated workflow: ${workflow.name}`,
      metadata: { workflowId: workflow._id },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Workflow updated successfully",
        workflow,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Update workflow error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// DELETE workflow
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Workflow } = await import("@/models/Workflow")

    await dbConnect()

    const workflow = await Workflow.findOneAndDelete({
      _id: params.id,
      userId: decoded.userId,
    })

    if (!workflow) {
      return NextResponse.json({ error: "Workflow not found" }, { status: 404 })
    }

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: decoded.userId,
      action: "workflow.delete",
      description: `Deleted workflow: ${workflow.name}`,
      metadata: { workflowName: workflow.name },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Workflow deleted successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Delete workflow error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
