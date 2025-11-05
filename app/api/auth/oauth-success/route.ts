import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateToken } from "@/lib/jwt"
import dbConnect from "@/lib/db"
import User from "@/models/User"

/**
 * Server-side OAuth success handler
 * This endpoint is called immediately after OAuth completes to set the JWT cookie
 * while the NextAuth session still exists
 */
export async function GET(request: NextRequest) {
  try {
    console.log('[oauth-success] Handling OAuth success, setting JWT cookie...')
    
    // Get the NextAuth session (should exist at this moment)
    const session = await auth()
    
    if (!session?.user?.id) {
      console.log('[oauth-success] ❌ No session found, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    console.log('[oauth-success] ✅ Session found for user:', session.user.id)
    
    // Get user from database
    await dbConnect()
    const user = await User.findById(session.user.id).select("-password")
    
    if (!user) {
      console.log('[oauth-success] ❌ User not found in database')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })
    
    const isProduction = process.env.NODE_ENV === 'production'
    const maxAge = 7 * 24 * 60 * 60 // 7 days
    
    // Build cookie string manually
    const cookieString = [
      `auth-token=${token}`,
      'HttpOnly',
      'Path=/',
      `Max-Age=${maxAge}`,
      'SameSite=Lax',
      isProduction ? 'Secure' : ''
    ].filter(Boolean).join('; ')
    
    console.log('[oauth-success] ✅ JWT cookie set, redirecting to dashboard')
    
    // Redirect to dashboard with JWT cookie
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    response.headers.set('Set-Cookie', cookieString)
    
    return response
  } catch (error) {
    console.error('[oauth-success] ❌ Error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
