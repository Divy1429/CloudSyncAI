import { handlers, auth } from "@/lib/auth"
import { NextRequest } from "next/server"
import { generateToken } from "@/lib/jwt"
import dbConnect from "@/lib/db"
import User from "@/models/User"

// Wrap handlers to set cookies manually after OAuth callback
async function wrapHandler(handler: Function, request: NextRequest) {
  // Call original NextAuth handler
  const response = await handler(request)
  
  // Check if this is a callback or session request
  const url = new URL(request.url)
  const isCallback = url.pathname.includes('/callback/')
  const isSessionRequest = url.pathname.includes('/session')
  
  // If it's a session request after OAuth, check if we have session and set JWT cookie
  if (isSessionRequest) {
    try {
      const session = await auth()
      
      if (session?.user?.id) {
        console.log('[NextAuth] Session found, checking for JWT cookie')
        
        // Check if JWT cookie exists
        const hasJWT = request.cookies.has("auth-token")
        
        if (!hasJWT) {
          console.log('[NextAuth] No JWT cookie, setting it now')
          
          // Get user from database
          await dbConnect()
          const user = await User.findById(session.user.id).select("-password")
          
          if (user) {
            // Generate JWT token
            const token = generateToken({
              userId: user._id.toString(),
              email: user.email,
              name: user.name,
            })
            
            const isProduction = process.env.NODE_ENV === 'production'
            const maxAge = 7 * 24 * 60 * 60 // 7 days
            
            // Create new response with JWT cookie
            const newResponse = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            })
            
            // Set JWT cookie with manual Set-Cookie header
            const jwtCookie = [
              `auth-token=${token}`,
              'HttpOnly',
              'Path=/',
              `Max-Age=${maxAge}`,
              'SameSite=Lax',
              isProduction ? 'Secure' : ''
            ].filter(Boolean).join('; ')
            
            // Also set NextAuth session cookie manually as backup
            const sessionCookieName = isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
            const sessionToken = crypto.randomUUID() // Generate session token
            
            const sessionCookie = [
              `${sessionCookieName}=${sessionToken}`,
              'HttpOnly',
              'Path=/',
              `Max-Age=${maxAge}`,
              'SameSite=none',
              isProduction ? 'Secure' : ''
            ].filter(Boolean).join('; ')
            
            newResponse.headers.append('Set-Cookie', jwtCookie)
            newResponse.headers.append('Set-Cookie', sessionCookie)
            
            console.log('[NextAuth] Set both JWT and session cookies manually')
            
            return newResponse
          }
        }
      }
    } catch (error) {
      console.error('[NextAuth] Error setting cookies:', error)
    }
  }
  
  return response
}

export async function GET(request: NextRequest) {
  return wrapHandler(handlers.GET, request)
}

export async function POST(request: NextRequest) {
  return wrapHandler(handlers.POST, request)
}
