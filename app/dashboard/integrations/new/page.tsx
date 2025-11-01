"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewIntegrationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    provider: "aws",
    status: "disconnected",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create integration")
      }

      router.push("/dashboard/integrations")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/integrations"
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Integrations
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-card border border-border rounded-xl p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Integration</h1>
          <p className="text-foreground/60 mb-8">Connect a new cloud service</p>

          {error && (
            <div className="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Integration Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My AWS Connection"
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>

            <div>
              <label htmlFor="provider" className="block text-sm font-medium text-foreground mb-2">
                Provider *
              </label>
              <select
                id="provider"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="aws">Amazon Web Services (AWS)</option>
                <option value="azure">Microsoft Azure</option>
                <option value="gcp">Google Cloud Platform</option>
                <option value="dropbox">Dropbox</option>
                <option value="google-drive">Google Drive</option>
                <option value="onedrive">OneDrive</option>
                <option value="salesforce">Salesforce</option>
                <option value="slack">Slack</option>
                <option value="github">GitHub</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
                Initial Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="disconnected">Disconnected</option>
                <option value="connected">Connected</option>
              </select>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-sm text-blue-500">
                💡 <strong>Note:</strong> After creating the integration, you can configure credentials and advanced
                settings.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2">
                <Save className="h-5 w-5" />
                {loading ? "Creating..." : "Add Integration"}
              </Button>
              <Link href="/dashboard/integrations" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
