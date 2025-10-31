"use client"

import { useState } from "react"

const integrations = [
  { name: "Slack", icon: "💬", color: "from-purple-500 to-purple-600" },
  { name: "Notion", icon: "📝", color: "from-gray-600 to-gray-700" },
  { name: "Google Sheets", icon: "📊", color: "from-green-500 to-green-600" },
  { name: "Airtable", icon: "📋", color: "from-blue-500 to-blue-600" },
  { name: "Zapier", icon: "⚡", color: "from-orange-500 to-orange-600" },
  { name: "HubSpot", icon: "🎯", color: "from-red-500 to-red-600" },
]

export function CustomIntegrations() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Connect Your Tools</h2>
          <p className="text-xl text-muted-foreground">
            Seamlessly integrate with your favorite platforms. CloudSync AI connects to 100+ apps and services.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              onMouseEnter={() => setHoveredCard(integration.name)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-card border border-border rounded-2xl p-8 hover:bg-secondary transition-all duration-300 cursor-pointer">
                <div className="text-5xl mb-4">{integration.icon}</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{integration.name}</h3>
                {hoveredCard === integration.name && (
                  <div className="text-sm text-muted-foreground animate-in fade-in duration-300">
                    Connect and sync in minutes. Real-time data flow.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
