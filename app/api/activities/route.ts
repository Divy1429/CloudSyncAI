import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get("limit") || "50")
    const action = searchParams.get("action")

    const { default: dbConnect } = await import("@/lib/db")
    const { default: ActivityLog } = await import("@/models/ActivityLog")

    await dbConnect()

    const query: any = { userId: decoded.userId }
    if (action) {
      query.action = action
    }

    const activities = await ActivityLog.find(query).sort({ createdAt: -1 }).limit(limit)

    return NextResponse.json(
      {
        success: true,
        count: activities.length,
        activities,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get activities error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
