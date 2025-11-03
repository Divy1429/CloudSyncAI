import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
  }
  theme: {
    color: string
  }
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const initiatePayment = async (plan: string) => {
    if (!user) {
      setError("Please login to subscribe")
      router.push("/login")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK")
      }

      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // Razorpay checkout options
      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "CloudSync AI",
        description: `${orderData.plan.name} Plan Subscription`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: plan,
                amount: orderData.amount,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok) {
              // Payment successful
              alert("Payment successful! Your subscription is now active.")
              router.push("/dashboard")
            } else {
              throw new Error(verifyData.error || "Payment verification failed")
            }
          } catch (err: any) {
            setError(err.message)
            alert("Payment verification failed: " + err.message)
          } finally {
            setLoading(false)
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#ffffff",
        },
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.on("payment.failed", function (response: any) {
        setError(response.error.description)
        alert("Payment failed: " + response.error.description)
        setLoading(false)
      })
      razorpay.open()
    } catch (err: any) {
      setError(err.message)
      alert(err.message)
      setLoading(false)
    }
  }

  return { initiatePayment, loading, error }
}
