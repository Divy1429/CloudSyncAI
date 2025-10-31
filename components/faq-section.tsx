"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is CloudSync AI and how does it work?",
    answer:
      "CloudSync AI is an intelligent data synchronization and automation platform that uses machine learning to automatically sync, transform, and orchestrate data across your entire data ecosystem. Simply connect your data sources, define your sync rules, and our AI engine handles the rest—no manual data management required.",
  },
  {
    question: "Can I try CloudSync AI before committing to a paid plan?",
    answer:
      "We offer a 14-day free trial for all our plans with full feature access. No credit card required. Try the platform risk-free and see how it can transform your data operations.",
  },
  {
    question: "How secure is my data with CloudSync AI?",
    answer:
      "Security is paramount. We use military-grade encryption for all data in transit and at rest, comply with SOC 2 Type II, GDPR, and HIPAA standards. We offer two-factor authentication, role-based access control, comprehensive audit logging, and maintain 99.9% uptime with redundant infrastructure.",
  },
  {
    question: "What data sources and systems can CloudSync AI connect to?",
    answer:
      "CloudSync AI integrates with 500+ data sources including databases, data warehouses, APIs, cloud applications, and custom systems. Our pre-built connectors cover popular platforms like Salesforce, HubSpot, Google Workspace, Microsoft 365, AWS, and many more. We also support custom integrations via our API.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We provide comprehensive support including email support for all plans, priority support for Professional plans, and 24/7 dedicated support for Enterprise customers. Plus, we offer extensive documentation, video tutorials, live webinars, and a community forum for peer support.",
  },
  {
    question: "Can I change my plan or cancel anytime?",
    answer:
      "Yes, complete flexibility. Upgrade or downgrade your plan at any time. Upgrades are effective immediately with prorated billing. Downgrades take effect at your next billing cycle. You can cancel anytime with no penalties or long-term contracts.",
  },
  {
    question: "How does CloudSync AI use AI to automate data sync?",
    answer:
      "Our AI engine learns from your data patterns to automatically detect schema changes, handle data quality issues, and optimize sync performance. It can intelligently map fields across systems, flag anomalies, suggest transformations, and continuously improve sync accuracy without manual intervention.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "Your free trial includes full access to all features of the Professional plan: up to 50 data sources, 100GB of sync volume, advanced AI automation, 500+ connectors, custom workflows, API access, and priority email support.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need to know about CloudSync AI. Can't find what you're looking for? Contact our support
            team.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  )
}
