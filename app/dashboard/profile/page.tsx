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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-foreground/60 hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                Back to Dashboard
              </Link>
            </div>
            <Button onClick={logout} variant="outline" size="sm" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-xl p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{user?.name}</h1>
              <p className="text-foreground/60 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
              {user?.createdAt && (
                <p className="text-sm text-foreground/40 flex items-center gap-2 mt-2">
                  <Calendar className="h-4 w-4" />
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>

          {updateSuccess && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-xl mb-4">
              Profile updated successfully!
            </div>
          )}

          {updateError && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-xl mb-4">
              {updateError}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
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
            <div className="space-y-4">
              <div className="border-b border-border pb-4">
                <p className="text-sm text-foreground/60 mb-1">Full Name</p>
                <p className="text-lg font-medium text-foreground">{user?.name}</p>
              </div>
              <div className="border-b border-border pb-4">
                <p className="text-sm text-foreground/60 mb-1">Email Address</p>
                <p className="text-lg font-medium text-foreground">{user?.email}</p>
              </div>
              <div className="pb-4">
                <p className="text-sm text-foreground/60 mb-1">Account ID</p>
                <p className="text-lg font-mono text-foreground/80">{user?.id}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-card border border-border rounded-xl p-8 mt-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Security</h2>
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
