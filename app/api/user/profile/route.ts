import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function PUT(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { name, email } = await request.json()

    // Validation
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Get user from database
    const { default: dbConnect } = await import("@/lib/db")
    const { default: User } = await import("@/models/User")

    await dbConnect()

    // Check if email is already taken by another user
    if (email !== decoded.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { name, email },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: decoded.userId,
      action: "user.profile.update",
      description: `Updated profile information`,
      metadata: { name, email },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
