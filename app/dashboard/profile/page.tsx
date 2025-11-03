"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, LogOut } from "lucide-react"
import { useState } from "react"
import { ChangePasswordDialog } from "@/components/change-password-dialog"

export default function ProfilePage() {
  const { user, logout, loading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    )
  }

  const [updateError, setUpdateError] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateError("")
    setUpdateSuccess(false)

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile")
      }

      setUpdateSuccess(true)
      setIsEditing(false)
      // Refresh user data
      window.location.reload()
    } catch (error: any) {
      setUpdateError(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 text-foreground/60 hover:text-foreground text-sm sm:text-base">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden xs:inline">Back to Dashboard</span>
              <span className="xs:hidden">Back</span>
            </Link>
            <Button onClick={logout} variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left min-w-0 w-full">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2 truncate">{user?.name}</h1>
              <p className="text-sm sm:text-base text-foreground/60 flex items-center justify-center sm:justify-start gap-2 truncate">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </p>
              {user?.createdAt && (
                <p className="text-xs sm:text-sm text-foreground/40 flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Profile Information</h2>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="text-xs sm:text-sm">
                Edit Profile
              </Button>
            )}
          </div>

          {updateSuccess && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-3 sm:px-4 py-2 sm:py-3 rounded-xl mb-4 text-sm sm:text-base">
              Profile updated successfully!
            </div>
          )}

          {updateError && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-3 sm:px-4 py-2 sm:py-3 rounded-xl mb-4 text-sm sm:text-base">
              {updateError}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-xl text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-input border border-border rounded-xl text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button type="submit" className="flex-1 text-sm sm:text-base">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 text-sm sm:text-base"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({ name: user?.name || "", email: user?.email || "" })
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="border-b border-border pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Full Name</p>
                <p className="text-base sm:text-lg font-medium text-foreground truncate">{user?.name}</p>
              </div>
              <div className="border-b border-border pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Email Address</p>
                <p className="text-base sm:text-lg font-medium text-foreground truncate">{user?.email}</p>
              </div>
              <div className="pb-3 sm:pb-4">
                <p className="text-xs sm:text-sm text-foreground/60 mb-1">Account ID</p>
                <p className="text-sm sm:text-base lg:text-lg font-mono text-foreground/80 break-all">{user?.id}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 mt-4 sm:mt-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">Security</h2>
          <div className="space-y-4">
            <ChangePasswordDialog />
            <Button variant="outline" className="w-full justify-start" disabled>
              Two-Factor Authentication (Coming Soon)
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" disabled>
              Delete Account (Coming Soon)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
