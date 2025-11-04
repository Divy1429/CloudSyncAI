import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateToken } from "@/lib/jwt"
import dbConnect from "@/lib/db"
import User from "@/models/User"

/**
 * This endpoint is called by the client after OAuth redirect to ensure cookies are set
 * Workaround for Vercel Edge Runtime not setting cookies properly in OAuth flow
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[/api/auth/callback-success] Client requesting cookie setup after OAuth')
    
    // Get the NextAuth session
    const session = await auth()
    
    if (!session?.user?.id) {
      console.log('[/api/auth/callback-success] No session found')
      return NextResponse.json({ error: "No session found" }, { status: 401 })
    }
    
    console.log('[/api/auth/callback-success] Session found for user:', session.user.id)
    
    // Get user from database
    await dbConnect()
    const user = await User.findById(session.user.id).select("-password")
    
    if (!user) {
      console.log('[/api/auth/callback-success] User not found in database')
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })
    
    const isProduction = process.env.NODE_ENV === 'production'
    const maxAge = 7 * 24 * 60 * 60 // 7 days
    
    // Set JWT cookie with manual Set-Cookie header
    const cookieString = [
      `auth-token=${token}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${maxAge}`,
      'SameSite=Lax',
      isProduction ? 'Secure' : ''
    ].filter(Boolean).join('; ')
    
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      }
    })
    
    response.headers.set('Set-Cookie', cookieString)
    
    console.log('[/api/auth/callback-success] JWT cookie set successfully for OAuth user')
    
    return response
  } catch (error) {
    console.error('[/api/auth/callback-success] Error:', error)
    return NextResponse.json(
      { error: "Failed to setup cookies" },
      { status: 500 }
    )
  }
}
