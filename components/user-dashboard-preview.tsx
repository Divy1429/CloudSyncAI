"use client"

export function UserDashboardPreview() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Dashboard Preview</h2>
          <p className="text-xl text-muted-foreground">
            Your command center for data sync and automation. Monitor everything at a glance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Dashboard mockup */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="bg-secondary border-b border-border px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">Welcome back, Sarah</h3>
                  <p className="text-muted-foreground mt-1">Your syncs are running smoothly</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-card rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-lg font-bold text-foreground">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Syncs", value: "1,234" },
                  { label: "Files Synced", value: "45.2K" },
                  { label: "Uptime", value: "99.9%" },
                  { label: "Integrations", value: "8" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-secondary border border-border rounded-lg p-6 hover:bg-accent transition-colors"
                  >
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart mockup */}
              <div className="bg-secondary border border-border rounded-lg p-6 mb-8">
                <h4 className="font-semibold text-card-foreground mb-6">Sync Activity (Last 7 days)</h4>
                <div className="flex items-end justify-between h-48 gap-2">
                  {[45, 52, 38, 71, 65, 48, 82].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-white/20 to-white/5 rounded-t hover:from-white/30 transition-colors"
                      style={{ height: `${(height / 82) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-white/90 transition-colors">
                  Create New Workflow
                </button>
                <button className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors">
                  View Full Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
