import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

// GET all workflows for current user
export async function GET(request: NextRequest) {
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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const query: any = { userId: decoded.userId }
    if (status && ["active", "paused", "draft"].includes(status)) {
      query.status = status
    }

    const workflows = await Workflow.find(query).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        count: workflows.length,
        workflows,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get workflows error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// CREATE new workflow
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { name, description, status, trigger, actions } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Workflow name is required" }, { status: 400 })
    }

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Workflow } = await import("@/models/Workflow")

    await dbConnect()

    const workflow = await Workflow.create({
      userId: decoded.userId,
      name,
      description: description || "",
      status: status || "draft",
      trigger: trigger || { type: "manual", config: {} },
      actions: actions || [],
    })

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: decoded.userId,
      action: "workflow.create",
      description: `Created workflow: ${name}`,
      metadata: { workflowId: workflow._id, status },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Workflow created successfully",
        workflow,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create workflow error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
