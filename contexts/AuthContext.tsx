"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut as nextAuthSignOut } from "next-auth/react"

interface User {
  id: string
  name: string
  email: string
  image?: string
  createdAt?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Set mounted on client side only and check auth immediately
  useEffect(() => {
    setMounted(true)
    // Immediately check for JWT token on mount (before NextAuth loads)
    const checkInitialAuth = async () => {
      try {
        const response = await fetch("/api/user/me", {
          credentials: 'include',
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          if (data.user) {
            setUser(data.user)
            setLoading(false)
          }
        }
      } catch (error) {
        // Silently fail - will be handled by NextAuth check
      }
    }
    checkInitialAuth()
  }, [])

  // Check if we're on a protected route
  const isProtectedRoute = pathname?.startsWith('/dashboard')

  const refreshUser = useCallback(async () => {
    if (!mounted) {
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch("/api/user/me", {
        credentials: 'include',
        cache: 'no-store'
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      // Silently fail - user is just not authenticated via JWT
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [mounted])

  // Sync NextAuth session with user state
  useEffect(() => {
    if (!mounted) return

    if (status === "loading") {
      setLoading(true)
      return
    }

    if (status === "authenticated" && session?.user) {
      // User logged in via NextAuth (Google/GitHub)
      // Use session data directly and try to set JWT cookie in background
      console.log('[AuthContext] 🔐 OAuth session detected:', session.user.email)
      
      setUser({
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || undefined,
      })
      setLoading(false)
      
      // Try to set JWT cookie in background (non-blocking)
      const trySetJWTCookie = async () => {
        try {
          console.log('[AuthContext] Attempting to set JWT cookie...')
          const response = await fetch("/api/auth/set-oauth-cookie", {
            method: 'POST',
            credentials: 'include',
            cache: 'no-store',
          })
          
          if (response.ok) {
            const data = await response.json()
            console.log('[AuthContext] ✅ JWT cookie set successfully')
            // Update user with database data
            if (data.user) {
              setUser(data.user)
            }
          } else {
            console.log('[AuthContext] ⚠️ Could not set JWT cookie (session may have expired)')
            // Not critical - we have session data
          }
        } catch (error) {
          console.error("[AuthContext] ⚠️ Error setting JWT cookie:", error)
          // Not critical - we have session data
        }
      }
      
      trySetJWTCookie()
    } else if (status === "unauthenticated") {
      // Always check JWT token (for email/password login)
      refreshUser()
    }
  }, [mounted, session, status, refreshUser])

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important: include cookies
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Login failed")
    }

    setUser(data.user)
    
    // Set auth indicator in localStorage (as backup check)
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_check', 'true')
    }
    
    // Check for redirect URL in query params
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get("redirect")
    
    // If redirect is to home page with hash, use window.location for proper hash navigation
    if (redirect && redirect.includes('#')) {
      window.location.href = redirect
    } else if (redirect && redirect !== "/login" && redirect !== "/signup") {
      router.push(redirect)
    } else {
      router.push("/")
    }
  }

  const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirmPassword }),
      credentials: 'include', // Important: include cookies
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Signup failed")
    }

    setUser(data.user)
    
    // Set auth indicator in localStorage (as backup check)
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_check', 'true')
    }
    
    // Check for redirect URL in query params
    const urlParams = new URLSearchParams(window.location.search)
    const redirect = urlParams.get("redirect")
    
    // If redirect is to home page with hash, use window.location for proper hash navigation
    if (redirect && redirect.includes('#')) {
      window.location.href = redirect
    } else if (redirect && redirect !== "/login" && redirect !== "/signup") {
      router.push(redirect)
    } else {
      router.push("/")
    }
  }

  const logout = async () => {
    try {
      // Check if user is logged in via NextAuth
      if (session) {
        await nextAuthSignOut({ redirect: false })
      }
      
      // Also clear JWT token
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      
      // Clear localStorage auth indicator
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_check')
      }
      
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
