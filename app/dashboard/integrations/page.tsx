"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus, Cloud, Trash2, LogOut, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface IntegrationType {
  _id: string
  name: string
  provider: string
  status: "connected" | "disconnected" | "error"
  lastSync?: string
  syncCount: number
  createdAt: string
}

const providerIcons: { [key: string]: string } = {
  aws: "☁️",
  azure: "🔷",
  gcp: "🌩️",
  dropbox: "📦",
  "google-drive": "📁",
  onedrive: "📊",
  salesforce: "⚡",
  slack: "💬",
  github: "🐙",
  custom: "🔧",
}

export default function IntegrationsPage() {
  const { logout, loading: authLoading } = useAuth()
  const [integrations, setIntegrations] = useState<IntegrationType[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchIntegrations()
  }, [filter])

  const fetchIntegrations = async () => {
    try {
      const url = filter === "all" ? "/api/integrations" : `/api/integrations?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setIntegrations(data.integrations)
      }
    } catch (error) {
      console.error("Failed to fetch integrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteIntegration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this integration?")) return

    try {
      const response = await fetch(`/api/integrations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setIntegrations(integrations.filter((i) => i._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete integration:", error)
    }
  }

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "connected" ? "disconnected" : "connected"

    try {
      const response = await fetch(`/api/integrations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchIntegrations()
      }
    } catch (error) {
      console.error("Failed to update integration:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading integrations...</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
            <CheckCircle className="h-3 w-3" />
            Connected
          </span>
        )
      case "disconnected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
            <XCircle className="h-3 w-3" />
            Disconnected
          </span>
        )
      case "error":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
            <AlertCircle className="h-3 w-3" />
            Error
          </span>
        )
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Integrations</h1>
            <p className="text-foreground/60">Connect and manage your cloud services</p>
          </div>
          <Link href="/dashboard/integrations/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Integration
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
            All
          </Button>
          <Button
            variant={filter === "connected" ? "default" : "outline"}
            onClick={() => setFilter("connected")}
            size="sm"
          >
            Connected
          </Button>
          <Button
            variant={filter === "disconnected" ? "default" : "outline"}
            onClick={() => setFilter("disconnected")}
            size="sm"
          >
            Disconnected
          </Button>
        </div>

        {/* Integrations List */}
        {integrations.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Cloud className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No integrations yet</h3>
            <p className="text-foreground/60 mb-6">Connect your cloud services to start syncing data</p>
            <Link href="/dashboard/integrations/new">
              <Button>
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Integration
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div
                key={integration._id}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{providerIcons[integration.provider] || "🔧"}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                      <p className="text-sm text-foreground/60 capitalize">{integration.provider}</p>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground/60">Syncs:</span>
                    <span className="text-foreground font-medium">{integration.syncCount}</span>
                  </div>
                  {integration.lastSync && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/60">Last sync:</span>
                      <span className="text-foreground">{new Date(integration.lastSync).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => toggleStatus(integration._id, integration.status)}
                  >
                    {integration.status === "connected" ? "Disconnect" : "Connect"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteIntegration(integration._id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
