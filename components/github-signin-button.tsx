"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface GitHubSignInButtonProps {
  callbackUrl?: string
  text?: string
}

export function GitHubSignInButton({ 
  callbackUrl = "/",
  text = "Continue with GitHub" 
}: GitHubSignInButtonProps) {
  const handleGitHubSignIn = async () => {
    try {
      await signIn("github", { callbackUrl })
    } catch (error) {
      console.error("GitHub sign-in error:", error)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-3 h-12 bg-[#24292e] text-white hover:bg-[#2f363d] hover:text-white border-[#24292e]"
      onClick={handleGitHubSignIn}
    >
      <Github className="h-5 w-5" />
      {text}
    </Button>
  )
}
