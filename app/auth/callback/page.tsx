"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function OAuthCallbackPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleCallback() {
      if (status === "loading") {
        return
      }

      if (status === "unauthenticated") {
        setError("OAuth authentication failed")
        setTimeout(() => router.push("/login"), 2000)
        return
      }

      if (status === "authenticated" && session?.user) {
        try {
          // Call endpoint to set JWT cookie
          const response = await fetch("/api/auth/set-oauth-cookie", {
            method: "POST",
            credentials: "include",
          })

          if (response.ok) {
            // JWT cookie set successfully, redirect to dashboard
            router.push("/dashboard")
          } else {
            setError("Failed to complete authentication")
            setTimeout(() => router.push("/login"), 2000)
          }
        } catch (error) {
          console.error("OAuth callback error:", error)
          setError("Authentication error occurred")
          setTimeout(() => router.push("/login"), 2000)
        }
      }
    }

    handleCallback()
  }, [session, status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-destructive text-xl mb-4">❌ {error}</div>
            <div className="text-muted-foreground">Redirecting to login...</div>
          </>
        ) : (
          <>
            <div className="text-xl mb-4">🔐 Completing authentication...</div>
            <div className="text-muted-foreground">Please wait</div>
          </>
        )}
      </div>
    </div>
  )
}
