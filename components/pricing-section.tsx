"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Check, ArrowRight, Crown } from "lucide-react"
import { useRazorpay } from "@/hooks/use-razorpay"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { PaymentSuccessDialog } from "./payment-success-dialog"
import { Badge } from "./ui/badge"

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for small teams and startups",
    features: [
      "Up to 5 data sources",
      "1GB sync volume/month",
      "Basic automation",
      "Email support",
      "Standard connectors",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$199",
    period: "/month",
    description: "Best for growing data operations",
    features: [
      "Up to 50 data sources",
      "100GB sync volume/month",
      "Advanced AI automation",
      "Priority support",
      "500+ connectors",
      "Custom workflows",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale data operations",
    features: [
      "Unlimited data sources",
      "Unlimited sync volume",
      "Custom AI models",
      "24/7 dedicated support",
      "Custom connectors",
      "Advanced security",
      "SLA guarantee",
      "On-premise deployment",
    ],
    popular: false,
  },
]

export function PricingSection() {
  const {
    initiatePayment,
    loading,
    showSuccessDialog,
    setShowSuccessDialog,
    successPlan,
  } = useRazorpay()
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)
  const [userSubscription, setUserSubscription] = useState<{
    plan: string
    status: string
  } | null>(null)
  const { user } = useAuth()

  // Fetch user's subscription
  useEffect(() => {
    if (user) {
      fetch("/api/user/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.subscription && data.subscription.status === "active") {
            setUserSubscription(data.subscription)
          }
        })
        .catch(() => {
          // Ignore errors
        })
    }
  }, [user, showSuccessDialog]) // Refetch when dialog closes

  // Check for pending plan after user logs in
  useEffect(() => {
    if (user) {
      const pendingPlan = localStorage.getItem("pending_plan")
      if (pendingPlan) {
        localStorage.removeItem("pending_plan")
        // Wait a bit for everything to load
        setTimeout(() => {
          handleGetStarted(pendingPlan.charAt(0).toUpperCase() + pendingPlan.slice(1))
        }, 1000)
      }
    }
  }, [user])

  const handleGetStarted = async (planName: string) => {
    if (planName === "Enterprise") {
      // Contact sales for enterprise
      window.location.href = "mailto:sales@cloudsyncai.com?subject=Enterprise Plan Inquiry"
      return
    }

    setProcessingPlan(planName.toLowerCase())
    await initiatePayment(planName.toLowerCase())
    setProcessingPlan(null)
  }

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 px-4 bg-black">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Choose the perfect plan for your data sync needs. Scale as you grow with no hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative bg-card border rounded-lg p-8 ${
                plan.popular ? "border-white/30 bg-white/5" : "border-border/20 bg-background/50"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
              )}

              {userSubscription?.plan === plan.name.toLowerCase() && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-0">
                    <Crown className="w-3 h-3 mr-1" />
                    Current Plan
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-white mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-transparent border border-white/20 text-white hover:bg-white/10"
                } group`}
                size="lg"
                onClick={() => handleGetStarted(plan.name)}
                disabled={
                  (loading && processingPlan === plan.name.toLowerCase()) ||
                  userSubscription?.plan === plan.name.toLowerCase()
                }
              >
                {loading && processingPlan === plan.name.toLowerCase() ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : userSubscription?.plan === plan.name.toLowerCase() ? (
                  "Active"
                ) : (
                  <>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">All plans include 14-day free trial • No credit card required</p>
          <p className="text-sm text-gray-500">
            Need a custom solution?{" "}
            <a href="#" className="text-white hover:underline">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>

      {/* Payment Success Dialog */}
      <PaymentSuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        plan={successPlan}
      />
    </section>
  )
}
