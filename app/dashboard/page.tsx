"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  LayoutDashboard,
  Workflow,
  Cloud,
  BarChart3,
  Settings,
  Bell,
  Users,
  FileText,
  LogOut,
  TrendingUp,
} from "lucide-react"
import { useEffect, useState } from "react"

interface Stats {
  workflows: {
    total: number
    active: number
    paused: number
    draft: number
    totalRuns: number
    successRate: number
    totalSuccess: number
    totalFailures: number
  }
  integrations: {
    total: number
    connected: number
    disconnected: number
  }
  activities: {
    recent: any[]
    last7Days: number
  }
}

export default function DashboardPage() {
  const { user, logout, loading } = useAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats")
      const data = await response.json()
      if (response.ok) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoadingStats(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading dashboard...</p>
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
              <Link href="/" className="text-2xl font-bold text-primary">
                CloudSync AI
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground/60">Welcome, {user?.name}</span>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="bg-card border border-border rounded-xl p-4 space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/dashboard/workflows"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
              >
                <Workflow className="h-5 w-5" />
                Workflows
              </Link>
              <Link
                href="/dashboard/integrations"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
              >
                <Cloud className="h-5 w-5" />
                Integrations
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
              >
                <BarChart3 className="h-5 w-5" />
                Analytics
              </Link>
              <Link
                href="/dashboard/team"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
              >
                <Users className="h-5 w-5" />
                Team
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent text-foreground/60 hover:text-foreground transition-colors"
              >
                <Settings className="h-5 w-5" />
                Profile
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-xl p-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-foreground/60">
                Here's what's happening with your data workflows today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground/60">Active Workflows</h3>
                  <Workflow className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {loadingStats ? "..." : stats?.workflows.active || 0}
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  {stats?.workflows.total || 0} total workflows
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground/60">Integrations</h3>
                  <Cloud className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {loadingStats ? "..." : stats?.integrations.connected || 0}
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  {stats?.integrations.total || 0} total connections
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground/60">Success Rate</h3>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {loadingStats ? "..." : stats?.workflows.successRate || 0}%
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  {stats?.workflows.totalRuns || 0} total runs
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="justify-start h-auto py-4" variant="outline">
                  <Workflow className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Create Workflow</p>
                    <p className="text-sm text-foreground/60">Build your first automation</p>
                  </div>
                </Button>
                <Button className="justify-start h-auto py-4" variant="outline">
                  <Cloud className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Add Integration</p>
                    <p className="text-sm text-foreground/60">Connect your cloud services</p>
                  </div>
                </Button>
                <Button className="justify-start h-auto py-4" variant="outline">
                  <Users className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">Invite Team</p>
                    <p className="text-sm text-foreground/60">Collaborate with others</p>
                  </div>
                </Button>
                <Button className="justify-start h-auto py-4" variant="outline">
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-semibold">View Documentation</p>
                    <p className="text-sm text-foreground/60">Learn how to get started</p>
                  </div>
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
                <Link href="/dashboard/activity">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {loadingStats ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : stats?.activities.recent && stats.activities.recent.length > 0 ? (
                <div className="space-y-3">
                  {stats.activities.recent.slice(0, 5).map((activity: any) => (
                    <div key={activity._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.description}</p>
                        <p className="text-xs text-foreground/60 mt-1">
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-foreground/20 mx-auto mb-4" />
                  <p className="text-foreground/60">No recent activity</p>
                  <p className="text-sm text-foreground/40 mt-2">
                    Your workflow activities will appear here
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
