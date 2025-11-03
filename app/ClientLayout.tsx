"use client"

import { Suspense, useState, useEffect } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { SessionProvider } from "next-auth/react"
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionProvider>
        <AuthProvider>
          <div className={`font-sans ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
            {children}
          </div>
        </AuthProvider>
      </SessionProvider>
    </Suspense>
  )
}
