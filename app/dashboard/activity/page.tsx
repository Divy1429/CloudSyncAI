"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, LogOut, Activity } from "lucide-react"
import { useEffect, useState } from "react"

interface ActivityType {
  _id: string
  action: string
  description: string
  metadata: any
  createdAt: string
}

const actionIcons: { [key: string]: string } = {
  "user.login": "🔐",
  "user.logout": "👋",
  "user.signup": "✨",
  "user.profile.update": "👤",
  "user.password.change": "🔑",
  "workflow.create": "➕",
  "workflow.update": "✏️",
  "workflow.delete": "🗑️",
  "workflow.run": "▶️",
  "integration.create": "🔗",
  "integration.update": "🔄",
  "integration.delete": "❌",
  "integration.sync": "🔄",
}

export default function ActivityPage() {
  const { logout, loading: authLoading } = useAuth()
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities?limit=100")
      const data = await response.json()

      if (response.ok) {
        setActivities(data.activities)
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading activities...</p>
        </div>
      </div>
    )
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Activity Log</h1>
          <p className="text-foreground/60">Track all your account activities and actions</p>
        </div>

        {/* Activities List */}
        {activities.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Activity className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No activities yet</h3>
            <p className="text-foreground/60">Your account activities will appear here</p>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <div key={activity._id}>
                  <div className="flex items-start gap-4 p-4 hover:bg-accent rounded-lg transition-colors">
                    <div className="text-2xl mt-1">{actionIcons[activity.action] || "📌"}</div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-foreground/60">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                        <span className="text-xs text-foreground/40 px-2 py-0.5 bg-accent rounded">
                          {activity.action}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < activities.length - 1 && <div className="border-b border-border ml-14"></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
