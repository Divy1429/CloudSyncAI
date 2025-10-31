"use client"
import { motion } from "framer-motion"
import { Lock, Shield, Key, CheckCircle2 } from "lucide-react"

export function SecureDataEncryption() {
  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest using AES-256 standard",
    },
    {
      icon: Key,
      title: "Key Management",
      description: "Secure key rotation and management with customer-controlled encryption keys",
    },
    {
      icon: Shield,
      title: "Compliance Certified",
      description: "GDPR, HIPAA, SOC 2 Type II, and ISO 27001 compliant infrastructure",
    },
    {
      icon: CheckCircle2,
      title: "Audit Trails",
      description: "Complete audit logs for all data access and modifications",
    },
  ]

  const encryptionSteps = [
    { step: "1", label: "Data Input", icon: "📥" },
    { step: "2", label: "Encryption", icon: "🔒" },
    { step: "3", label: "Secure Transfer", icon: "🔐" },
    { step: "4", label: "Decryption", icon: "🔓" },
    { step: "5", label: "Destination", icon: "📤" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Secure Data Encryption
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enterprise-grade security with lock icon visuals representing end-to-end encryption
          </p>
        </div>

        {/* Encryption Flow */}
        <motion.div
          className="mb-16 p-8 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">Data Encryption Pipeline</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {encryptionSteps.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-2xl mb-2 hover:from-white/30 hover:to-white/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-xs font-semibold text-gray-300">{item.label}</div>
                {index < encryptionSteps.length - 1 && (
                  <div className="hidden md:block absolute w-12 h-0.5 bg-gradient-to-r from-white/20 to-transparent ml-20" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-colors group"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Certification Badges */}
        <motion.div
          className="mt-16 p-8 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h3 className="text-xl font-semibold text-white mb-8 text-center">Security Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["SOC 2 Type II", "GDPR", "HIPAA", "ISO 27001"].map((cert, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/0 border border-white/10 hover:border-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: false }}
              >
                <Shield className="w-8 h-8 text-white mb-3" />
                <span className="text-center font-semibold text-white text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
