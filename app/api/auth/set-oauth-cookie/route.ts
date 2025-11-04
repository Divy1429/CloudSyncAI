import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateToken } from "@/lib/jwt"
import dbConnect from "@/lib/db"
import User from "@/models/User"

/**
 * CRITICAL: This endpoint MUST be called after OAuth login to set the JWT cookie
 * Vercel Edge Runtime doesn't set NextAuth cookies properly, so we manually set JWT
 */
export async function POST(request: NextRequest) {
  try {
    console.log('[set-oauth-cookie] Attempting to set JWT cookie for OAuth user')
    
    // Get the NextAuth session
    const session = await auth()
    
    if (!session?.user?.id) {
      console.log('[set-oauth-cookie] No session found')
      return NextResponse.json({ 
        error: "Not authenticated",
        needsLogin: true 
      }, { status: 401 })
    }
    
    console.log('[set-oauth-cookie] Session found for user:', session.user.id)
    
    // Get user from database
    await dbConnect()
    const user = await User.findById(session.user.id).select("-password")
    
    if (!user) {
      console.log('[set-oauth-cookie] User not found in database')
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
    
    // Build cookie string manually
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
    
    // Set cookie using raw Set-Cookie header
    response.headers.set('Set-Cookie', cookieString)
    
    console.log('[set-oauth-cookie] JWT cookie set successfully')
    console.log('[set-oauth-cookie] Cookie string:', cookieString.substring(0, 50) + '...')
    
    return response
  } catch (error) {
    console.error('[set-oauth-cookie] Error:', error)
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 }
    )
  }
}
