"use client"

const timelineEvents = [
  {
    id: 1,
    title: "Q4-Report_final.xlsx",
    action: "File synced",
    timestamp: "10:45 AM",
    status: "completed",
  },
  {
    id: 2,
    title: "Merge conflict detected",
    action: "Auto-resolved",
    timestamp: "10:42 AM",
    status: "resolved",
  },
  {
    id: 3,
    title: "23 files updated",
    action: "Batch sync",
    timestamp: "10:30 AM",
    status: "completed",
  },
  {
    id: 4,
    title: "Database backup",
    action: "Backup to AWS S3",
    timestamp: "09:15 AM",
    status: "completed",
  },
  {
    id: 5,
    title: "Team collaboration enabled",
    action: "Permissions updated",
    timestamp: "08:00 AM",
    status: "completed",
  },
]

export function VersionHistoryTimeline() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Version History & Timeline</h2>
          <p className="text-xl text-muted-foreground">
            Track every sync event, version change, and collaboration activity in real-time.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

            {/* Timeline items */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative pl-24">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 -translate-x-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-lg" />
                    <div className="relative w-full h-full border-2 border-border rounded-full bg-card flex items-center justify-center">
                      <span className="text-sm">{event.status === "completed" ? "✓" : "⚠️"}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="bg-card border border-border rounded-lg p-6 hover:bg-secondary transition-all duration-300">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-card-foreground">{event.title}</h3>
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                        {event.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
