import { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

/**
 * Get authenticated user ID from either NextAuth session (OAuth) or JWT token (email/password)
 * Returns null if not authenticated
 */
export async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  try {
    // Try NextAuth session first (for OAuth users)
    // In NextAuth v5 + App Router, we need to pass headers to access cookies in API routes
    const session = await auth()
    
    console.log('[auth-helper] NextAuth session check:', {
      hasSession: !!session,
      userId: session?.user?.id,
      email: session?.user?.email
    })
    
    if (session?.user?.id) {
      console.log('[auth-helper] ✅ Authenticated via NextAuth session')
      return session.user.id
    }
  } catch (error) {
    console.error('[auth-helper] Error checking NextAuth session:', error)
  }

  // Try JWT token (for email/password users)
  const token = request.cookies.get("auth-token")?.value
  
  console.log('[auth-helper] JWT token check:', {
    hasToken: !!token
  })
  
  if (!token) {
    console.log('[auth-helper] ❌ No authentication found')
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    console.log('[auth-helper] ❌ Invalid JWT token')
    return null
  }

  console.log('[auth-helper] ✅ Authenticated via JWT token')
  return decoded.userId
}

/**
 * Check if request is authenticated (either via NextAuth or JWT)
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const userId = await getAuthenticatedUserId(request)
  return userId !== null
}
