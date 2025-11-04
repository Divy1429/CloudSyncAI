import { NextRequest, NextResponse } from "next/server"
import { verifyToken, generateToken } from "@/lib/jwt"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Debug: Log all cookies
    const allCookies = request.cookies.getAll()
    console.log('[/api/user/me] Cookies:', allCookies.map(c => ({ name: c.name, hasValue: !!c.value })))
    
    // First, try to get user from NextAuth session
    const session = await auth()
    console.log('[/api/user/me] Session:', { hasSession: !!session, userId: session?.user?.id })
    
    if (session?.user) {
      // User is authenticated via NextAuth (Google/GitHub OAuth)
      const { default: dbConnect } = await import("@/lib/db")
      const { default: User } = await import("@/models/User")
      
      await dbConnect()
      
      const user = await User.findById(session.user.id).select("-password")
      
      if (user) {
        // Check if JWT cookie exists
        const hasJWT = request.cookies.has("auth-token")
        
        const response = NextResponse.json(
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
        
        // If OAuth session exists but no JWT cookie, set JWT cookie for consistency
        if (!hasJWT) {
          console.log('[/api/user/me] OAuth session found but no JWT cookie - setting JWT cookie')
          
          const token = generateToken({
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
          })
          
          const isProduction = process.env.NODE_ENV === 'production'
          const maxAge = 7 * 24 * 60 * 60 // 7 days
          
          const cookieString = [
            `auth-token=${token}`,
            'HttpOnly',
            'Path=/',
            `Max-Age=${maxAge}`,
            'SameSite=Lax',
            isProduction ? 'Secure' : ''
          ].filter(Boolean).join('; ')
          
          response.headers.set('Set-Cookie', cookieString)
          console.log('[/api/user/me] JWT cookie set for OAuth user')
        }
        
        return response
      }
    }
    
    // If no NextAuth session, try JWT token (credentials login)
    const token = request.cookies.get("auth-token")?.value
    console.log('[/api/user/me] JWT Token:', { hasToken: !!token, tokenLength: token?.length })

    if (!token) {
      console.log('[/api/user/me] No token found, returning 401')
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
