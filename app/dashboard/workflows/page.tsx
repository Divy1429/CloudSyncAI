"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Plus, Workflow, Play, Pause, Trash2, Edit, LogOut } from "lucide-react"
import { useEffect, useState } from "react"

interface WorkflowType {
  _id: string
  name: string
  description: string
  status: "active" | "paused" | "draft"
  runCount: number
  successCount: number
  failureCount: number
  createdAt: string
  lastRun?: string
}

export default function WorkflowsPage() {
  const { user, logout, loading: authLoading } = useAuth()
  const [workflows, setWorkflows] = useState<WorkflowType[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchWorkflows()
  }, [filter])

  const fetchWorkflows = async () => {
    try {
      const url = filter === "all" ? "/api/workflows" : `/api/workflows?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setWorkflows(data.workflows)
      }
    } catch (error) {
      console.error("Failed to fetch workflows:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteWorkflow = async (id: string) => {
    if (!confirm("Are you sure you want to delete this workflow?")) return

    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setWorkflows(workflows.filter((w) => w._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete workflow:", error)
    }
  }

  const toggleWorkflowStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"

    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchWorkflows()
      }
    } catch (error) {
      console.error("Failed to update workflow:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading workflows...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "paused":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "draft":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Workflows</h1>
            <p className="text-foreground/60">Create and manage your automation workflows</p>
          </div>
          <Link href="/dashboard/workflows/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Workflow
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={filter === "paused" ? "default" : "outline"}
            onClick={() => setFilter("paused")}
            size="sm"
          >
            Paused
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
            size="sm"
          >
            Draft
          </Button>
        </div>

        {/* Workflows List */}
        {workflows.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <Workflow className="h-16 w-16 text-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No workflows yet</h3>
            <p className="text-foreground/60 mb-6">Get started by creating your first automation workflow</p>
            <Link href="/dashboard/workflows/new">
              <Button>
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Workflow
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <div key={workflow._id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{workflow.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                        {workflow.status}
                      </span>
                    </div>
                    {workflow.description && (
                      <p className="text-foreground/60 mb-4">{workflow.description}</p>
                    )}
                    <div className="flex items-center gap-6 text-sm text-foreground/60">
                      <span>Runs: {workflow.runCount}</span>
                      <span className="text-green-500">Success: {workflow.successCount}</span>
                      <span className="text-red-500">Failed: {workflow.failureCount}</span>
                      {workflow.lastRun && (
                        <span>Last run: {new Date(workflow.lastRun).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleWorkflowStatus(workflow._id, workflow.status)}
                      disabled={workflow.status === "draft"}
                    >
                      {workflow.status === "active" ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Link href={`/dashboard/workflows/${workflow._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteWorkflow(workflow._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
