"use client"

import { useEffect, useState } from "react"

const syncNodes = [
  { id: 1, name: "US East", x: 20, y: 40, active: true },
  { id: 2, name: "Europe", x: 50, y: 30, active: true },
  { id: 3, name: "Asia Pacific", x: 75, y: 50, active: true },
  { id: 4, name: "South America", x: 30, y: 75, active: false },
]

export function DataSyncMap() {
  const [animateLines, setAnimateLines] = useState(false)

  useEffect(() => {
    setAnimateLines(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Global Data Sync Network</h2>
          <p className="text-xl text-muted-foreground">
            Redundant servers across the globe ensure your data is always safe and accessible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Interactive map */}
          <div className="relative w-full aspect-video bg-gradient-to-b from-secondary to-secondary/50 border border-border rounded-2xl overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* SVG for connecting lines */}
            <svg width="100%" height="100%" className="absolute inset-0">
              {syncNodes.map((node1, i) =>
                syncNodes
                  .slice(i + 1)
                  .map((node2, j) => (
                    <line
                      key={`${i}-${j}`}
                      x1={`${node1.x}%`}
                      y1={`${node1.y}%`}
                      x2={`${node2.x}%`}
                      y2={`${node2.y}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      opacity={animateLines ? 0.3 : 0.1}
                      className="transition-opacity duration-1000"
                    />
                  )),
              )}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(255,255,255)" />
                  <stop offset="100%" stopColor="rgb(64,64,64)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Nodes */}
            <div className="absolute inset-0">
              {syncNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full blur-lg ${
                      node.active ? "bg-white/20 animate-pulse" : "bg-gray-500/10"
                    }`}
                  />
                  {/* Node */}
                  <div
                    className={`relative w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex items-center justify-center ${
                      node.active ? "bg-white/20 border-white/50" : "bg-gray-600/20 border-gray-600/50"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${node.active ? "bg-white" : "bg-gray-600"}`} />
                  </div>
                  {/* Label */}
                  <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-sm font-medium text-foreground">{node.name}</p>
                    <p className="text-xs text-muted-foreground text-center">{node.active ? "Active" : "Standby"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Uptime", value: "99.99%" },
              { label: "Regions", value: "4" },
              { label: "Data Centers", value: "12" },
              { label: "Avg Latency", value: "45ms" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-6 text-center hover:bg-secondary transition-colors"
              >
                <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
