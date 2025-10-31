"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Zap, Cloud, Target } from "lucide-react"

export function AIWorkflowBuilder() {
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const blocks = [
    {
      title: "Source",
      description: "Connect your data source",
      icon: Cloud,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      title: "Process",
      description: "AI-powered transformation",
      icon: Zap,
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      title: "Destination",
      description: "Sync to target systems",
      icon: Target,
      color: "from-cyan-500/20 to-cyan-500/5",
    },
  ]

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">
            Build Smart Workflows Visually
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            No code required. Create intelligent data automation pipelines in minutes with our intuitive visual builder
          </p>
        </div>

        {/* Workflow Visualization */}
        <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-8 md:p-12 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-white/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-l from-white/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16 flex-wrap md:flex-nowrap">
              {blocks.map((block, idx) => {
                const Icon = block.icon
                return (
                  <div key={idx} className="flex flex-col md:flex-row items-center gap-4 md:gap-0 flex-1 min-w-0">
                    {/* Block */}
                    <div
                      className={`flex-1 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border bg-gradient-to-br ${block.color} backdrop-blur-sm transition-all duration-300 cursor-pointer w-full ${
                        hoveredBlock === idx
                          ? "scale-105 border-foreground/50 shadow-lg shadow-white/10"
                          : "hover:border-foreground/30"
                      }`}
                      onMouseEnter={() => setHoveredBlock(idx)}
                      onMouseLeave={() => setHoveredBlock(null)}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-lg bg-background/50 border border-border flex-shrink-0">
                          <Icon size={20} className="text-foreground sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">{block.title}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">{block.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    {idx < blocks.length - 1 && (
                      <div className="hidden md:flex items-center justify-center">
                        <div
                          className={`transition-all duration-500 ${
                            animate && (hoveredBlock === idx || hoveredBlock === idx + 1) ? "translate-x-2" : ""
                          }`}
                        >
                          <ArrowRight size={20} className="text-muted-foreground md:w-6 md:h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">AI-Powered</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Machine learning models automatically optimize your workflows
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">Real-Time Monitoring</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Track every step of your data pipeline with live insights
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-background/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-foreground"></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">Error Handling</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Automatic error recovery and intelligent fallback systems
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-foreground text-background rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-transform duration-300">
                Try Workflow Builder
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
