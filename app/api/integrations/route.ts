import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { createActivityLog } from "@/lib/activity"

// GET all integrations for current user
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
    const { default: Integration } = await import("@/models/Integration")

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const provider = searchParams.get("provider")

    const query: any = { userId: decoded.userId }
    if (status && ["connected", "disconnected", "error"].includes(status)) {
      query.status = status
    }
    if (provider) {
      query.provider = provider
    }

    const integrations = await Integration.find(query).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        count: integrations.length,
        integrations,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get integrations error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

// CREATE new integration
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

    const { name, provider, status, credentials, config } = await request.json()

    if (!name || !provider) {
      return NextResponse.json({ error: "Name and provider are required" }, { status: 400 })
    }

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Integration } = await import("@/models/Integration")

    await dbConnect()

    const integration = await Integration.create({
      userId: decoded.userId,
      name,
      provider,
      status: status || "disconnected",
      credentials: credentials || {},
      config: config || {},
    })

    // Log activity
    await createActivityLog({
      userId: decoded.userId,
      action: "integration.create",
      description: `Created integration: ${name}`,
      metadata: { integrationId: integration._id, provider },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Integration created successfully",
        integration,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create integration error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
