import { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { auth } from "@/lib/auth"

/**
 * Get authenticated user ID from either NextAuth session (OAuth) or JWT token (email/password)
 * Returns null if not authenticated
 */
export async function getAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  // Try NextAuth session first (for OAuth users)
  const session = await auth()
  if (session?.user?.id) {
    return session.user.id
  }

  // Try JWT token (for email/password users)
  const token = request.cookies.get("auth-token")?.value
  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  return decoded.userId
}

/**
 * Check if request is authenticated (either via NextAuth or JWT)
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const userId = await getAuthenticatedUserId(request)
  return userId !== null
}
