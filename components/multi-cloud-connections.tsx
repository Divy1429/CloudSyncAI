"use client"
import { motion } from "framer-motion"
import { Cloud, Database, Lock } from "lucide-react"

export function MultiCloudConnections() {
  const clouds = [
    { name: "Google Drive", icon: "📁", delay: 0 },
    { name: "Dropbox", icon: "📦", delay: 0.2 },
    { name: "OneDrive", icon: "☁️", delay: 0.4 },
    { name: "AWS", icon: "⚙️", delay: 0.6 },
  ]

  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: "easeInOut" } },
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Multi-Cloud Connections
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
            Connect Google Drive, Dropbox, OneDrive, and AWS seamlessly
          </p>
        </div>

        <div className="relative w-full h-48 sm:h-64 md:h-96 flex items-center justify-center mb-8 md:mb-0">
          <svg
            className="absolute inset-0 w-full h-full hidden md:block"
            viewBox="0 0 800 300"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>

            <motion.line
              x1="100"
              y1="150"
              x2="200"
              y2="150"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              variants={connectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            />
            <motion.line
              x1="600"
              y1="150"
              x2="700"
              y2="150"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              variants={connectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            />
            <motion.line
              x1="400"
              y1="80"
              x2="400"
              y2="220"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              variants={connectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
            />
          </svg>

          <div className="relative z-10 w-full flex justify-between px-4 sm:px-8">
            {clouds.map((cloud, index) => (
              <motion.div
                key={cloud.name}
                className="flex flex-col items-center gap-2 sm:gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: cloud.delay, duration: 0.5 }}
                viewport={{ once: false }}
              >
                <motion.div
                  className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-lg sm:text-xl md:text-2xl hover:from-white/30 hover:to-white/10 transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                >
                  {cloud.icon}
                </motion.div>
                <span className="text-xs sm:text-sm font-medium text-gray-300 text-center">{cloud.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <motion.div
            className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Cloud className="w-6 sm:w-8 text-white mb-2 sm:mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Native Integrations</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Direct connections to all major cloud providers with zero setup time
            </p>
          </motion.div>

          <motion.div
            className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Database className="w-6 sm:w-8 text-white mb-2 sm:mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Real-time Sync</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Instant data synchronization across all connected platforms 24/7
            </p>
          </motion.div>

          <motion.div
            className="p-4 sm:p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <Lock className="w-6 sm:w-8 text-white mb-2 sm:mb-3" />
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">Secure Transfer</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Military-grade encryption for all data moving between clouds
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
