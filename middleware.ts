import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard"]

// Define auth routes (login, signup) - redirect to dashboard if already logged in
const authRoutes = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get tokens from cookies (both JWT and NextAuth)
  const jwtToken = request.cookies.get("auth-token")?.value
  const nextAuthToken = request.cookies.get("next-auth.session-token")?.value || 
                       request.cookies.get("__Secure-next-auth.session-token")?.value
  
  // Debug logging (remove after fixing)
  console.log('[Middleware]', {
    pathname,
    hasJWT: !!jwtToken,
    hasNextAuth: !!nextAuthToken,
    cookies: request.cookies.getAll().map(c => c.name)
  })
  
  // User is authenticated if either token exists
  const isAuthenticated = !!(jwtToken || nextAuthToken)
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  
  // If trying to access protected route without authentication, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL("/login", request.url)
    url.searchParams.set("redirect", pathname) // Save where they wanted to go
    return NextResponse.redirect(url)
  }
  
  // If trying to access auth routes while authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - images (image files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|images).*)",
  ],
}
