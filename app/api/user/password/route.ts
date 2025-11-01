export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
  if (process.env.VERCEL_ENV === "preview" && !process.env.MONGODB_URI) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const { default: dbConnect } = await import("@/lib/db")
    const { default: User } = await import("@/models/User")
    const { verifyToken } = await import("@/lib/jwt")
    const bcrypt = await import("bcryptjs")

    await dbConnect()

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

    const { currentPassword, newPassword, confirmPassword } = await request.json()

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 })
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: "New passwords do not match" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    if (currentPassword === newPassword) {
      return NextResponse.json({ error: "New password must be different from current password" }, { status: 400 })
    }

    // Get user with password
    const user = await User.findById(decoded.userId).select("+password")
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    // Update password
    user.password = hashedPassword
    await user.save()

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: user._id.toString(),
      action: "user.password.change",
      description: `${user.name} changed their password`,
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Password changed successfully",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Password change error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
