import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { createActivityLog } from "@/lib/activity"

// GET single integration
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
    const { default: Integration } = await import("@/models/Integration")

    await dbConnect()

    const integration = await Integration.findOne({
      _id: params.id,
      userId: decoded.userId,
    })

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        integration,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get integration error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// UPDATE integration
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
    const { default: Integration } = await import("@/models/Integration")

    await dbConnect()

    const integration = await Integration.findOneAndUpdate(
      {
        _id: params.id,
        userId: decoded.userId,
      },
      updates,
      { new: true, runValidators: true },
    )

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 })
    }

    // Log activity
    await createActivityLog({
      userId: decoded.userId,
      action: "integration.update",
      description: `Updated integration: ${integration.name}`,
      metadata: { integrationId: integration._id, provider: integration.provider },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Integration updated successfully",
        integration,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Update integration error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// DELETE integration
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
    const { default: Integration } = await import("@/models/Integration")

    await dbConnect()

    const integration = await Integration.findOneAndDelete({
      _id: params.id,
      userId: decoded.userId,
    })

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 })
    }

    // Log activity
    await createActivityLog({
      userId: decoded.userId,
      action: "integration.delete",
      description: `Deleted integration: ${integration.name}`,
      metadata: { provider: integration.provider },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Integration deleted successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Delete integration error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
