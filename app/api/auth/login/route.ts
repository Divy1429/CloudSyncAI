export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  if (process.env.VERCEL_ENV === "preview" && !process.env.MONGODB_URI) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const { default: dbConnect } = await import("@/lib/db")
    const { default: User } = await import("@/models/User")
    const bcrypt = await import("bcryptjs")

    await dbConnect()

    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Please provide email and password" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const { generateToken } = await import("@/lib/jwt")
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    // Log activity
    const { createActivityLog } = await import("@/lib/activity")
    await createActivityLog({
      userId: user._id.toString(),
      action: "user.login",
      description: `${user.name} logged in`,
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    })

    // Create response with token in cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Signed in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    )

    // Set HTTP-only cookie for security
    // Using Next.js cookie API for proper Vercel deployment
    const isProduction = process.env.NODE_ENV === "production"
    const cookieOptions = {
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    }
    
    console.log('[/api/auth/login] Setting cookie:', { 
      hasToken: !!token, 
      tokenLength: token.length,
      isProduction,
      cookieOptions: { ...cookieOptions, value: '[REDACTED]' }
    })
    
    response.cookies.set(cookieOptions)

    return response
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
