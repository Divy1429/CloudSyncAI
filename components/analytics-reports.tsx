"use client"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react"

export function AnalyticsReports() {
  const metrics = [
    { label: "Sync Success Rate", value: "99.8%", icon: TrendingUp, color: "from-white/20 to-white/5" },
    { label: "Avg. Sync Time", value: "2.3s", icon: Activity, color: "from-white/20 to-white/5" },
    { label: "Data Processed", value: "2.5TB", icon: BarChart3, color: "from-white/20 to-white/5" },
    { label: "Active Workflows", value: "1,247", icon: PieChart, color: "from-white/20 to-white/5" },
  ]

  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Analytics & Reports
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Charts and metrics showing sync performance and data insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Chart Area */}
          <motion.div
            className="p-8 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Sync Performance</h3>
            <div className="relative h-64 flex items-end gap-2">
              {[65, 78, 92, 85, 88, 95, 82, 90].map((height, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-white/40 to-white/20 rounded-t-lg hover:from-white/50 hover:to-white/30 transition-colors cursor-pointer relative group"
                  style={{ height: `${height}%` }}
                  whileHover={{ scale: 1.02 }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: false }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-sm text-gray-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
              <span>Today</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={i}
                  className={`p-6 rounded-lg bg-gradient-to-br ${metric.color} border border-white/10 hover:border-white/20 transition-colors`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: false }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-6 h-6 text-white mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Pie Chart */}
        <motion.div
          className="p-8 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h3 className="text-xl font-semibold text-white mb-8">Data Source Distribution</h3>
          <div className="flex items-center justify-center gap-16">
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="30"
                strokeDasharray="251.2 251.2"
                initial={{ strokeDashoffset: 251.2 }}
                whileInView={{ strokeDashoffset: 50 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: false }}
              />
              <motion.circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="30"
                strokeDasharray="50.24 251.2"
                initial={{ strokeDashoffset: 0 }}
                whileInView={{ strokeDashoffset: 50 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: false }}
                style={{ rotate: 251.2 }}
              />
            </svg>
            <div className="space-y-4">
              {[
                { label: "Cloud Storage", value: "45%" },
                { label: "Databases", value: "30%" },
                { label: "APIs", value: "20%" },
                { label: "Other", value: "5%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `rgba(255,255,255,${0.4 - i * 0.08}` }}
                  />
                  <div className="flex justify-between gap-8">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="font-semibold text-white">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
