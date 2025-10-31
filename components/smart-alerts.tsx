"use client"

import { useState, useEffect } from "react"

const alerts = [
  {
    id: 1,
    type: "success",
    title: "Sync completed successfully",
    message: "5,234 files synced from Dropbox to Google Drive",
    time: "2 minutes ago",
    icon: "✓",
  },
  {
    id: 2,
    type: "warning",
    title: "File conflict resolved",
    message: "CloudSync AI kept the newest version of 'Q4-Report.xlsx'",
    time: "15 minutes ago",
    icon: "⚠️",
  },
  {
    id: 3,
    type: "info",
    title: "Scheduled sync started",
    message: "Automatic backup to AWS S3 initiated",
    time: "1 hour ago",
    icon: "ℹ️",
  },
  {
    id: 4,
    type: "success",
    title: "New integration connected",
    message: "Airtable integration activated successfully",
    time: "3 hours ago",
    icon: "✓",
  },
]

export function SmartAlerts() {
  const [displayedAlerts, setDisplayedAlerts] = useState<typeof alerts>([])

  useEffect(() => {
    setDisplayedAlerts(alerts)
  }, [])

  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Smart Alert System</h2>
          <p className="text-xl text-muted-foreground">
            Real-time notifications keep you informed about every sync, error, and update.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {displayedAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className="bg-card border border-border rounded-xl p-4 hover:bg-secondary transition-all duration-300 animate-in fade-in slide-in-from-top-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-1">{alert.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-card-foreground mb-1">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
