import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // First, try to get user from NextAuth session
    const session = await auth()
    
    if (session?.user) {
      // User is authenticated via NextAuth (Google OAuth)
      const { default: dbConnect } = await import("@/lib/db")
      const { default: User } = await import("@/models/User")
      
      await dbConnect()
      
      const user = await User.findById(session.user.id).select("-password")
      
      if (user) {
        return NextResponse.json(
          {
            success: true,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: user.createdAt,
            },
          },
          { status: 200 }
        )
      }
    }
    
    // If no NextAuth session, try JWT token (credentials login)
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify JWT token
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user from database
    const { default: dbConnect } = await import("@/lib/db")
    const { default: User } = await import("@/models/User")

    await dbConnect()

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          createdAt: user.createdAt,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
