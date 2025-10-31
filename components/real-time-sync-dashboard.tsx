"use client"

import { useEffect, useState } from "react"
import { Cloud, Database } from "lucide-react"

export function RealTimeSyncDashboard() {
  const [activeSync, setActiveSync] = useState<number | null>(null)

  const services = [
    { name: "Google Drive", color: "#FF6B6B" },
    { name: "Dropbox", color: "#0061FF" },
    { name: "AWS S3", color: "#FF9900" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSync((prev) => (prev === null ? 0 : (prev + 1) % services.length))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">
            Real-Time Sync Dashboard
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Watch your data flow seamlessly between cloud services with intelligent synchronization
          </p>
        </div>

        <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tr from-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            {/* Source Services */}
            <div className="flex flex-col gap-3 sm:gap-6 w-full lg:w-auto">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border transition-all duration-500 ${
                    activeSync === idx ? "border-foreground bg-muted/50 scale-105" : "border-border bg-background/50"
                  }`}
                >
                  <Cloud size={18} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{service.name}</span>
                  {activeSync === idx && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-foreground animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Animated Connection Lines */}
            <div className="flex-1 relative h-32 sm:h-40 w-full lg:w-auto hidden lg:block">
              <svg className="w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="none">
                {services.map((_, idx) => (
                  <g key={idx}>
                    <line
                      x1="0"
                      y1={50 + idx * 50}
                      x2="200"
                      y2="75"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray="10,5"
                      className={`transition-opacity duration-500 ${activeSync === idx ? "opacity-100" : "opacity-30"}`}
                    />
                    {activeSync === idx && <circle cx="100" cy="75" r="4" fill="white" className="animate-pulse" />}
                  </g>
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="rgb(255,255,255)" stopOpacity="1" />
                    <stop offset="100%" stopColor="rgb(255,255,255)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-center lg:items-end gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-border bg-background/50 w-full lg:w-auto justify-center lg:justify-end">
                <span className="text-xs sm:text-sm font-medium text-foreground">Central Hub</span>
                <Database size={18} className="text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p>✓ Real-time sync</p>
                <p>✓ Data validation</p>
                <p>✓ Conflict resolution</p>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-muted-foreground truncate">{service.name}</span>
                  <span className="text-foreground font-medium text-xs sm:text-sm ml-2">
                    {activeSync === idx ? "Syncing..." : "100%"}
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-all duration-500"
                    style={{
                      width: activeSync === idx ? "100%" : "100%",
                      opacity: activeSync === idx ? 1 : 0.5,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
