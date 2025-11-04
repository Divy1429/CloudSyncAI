import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Plan pricing configuration
const PLANS = {
  starter: {
    name: "Starter",
    amount: 4900, // ₹49 in paise (Razorpay uses smallest currency unit)
    currency: "INR",
    period: "monthly",
  },
  professional: {
    name: "Professional",
    amount: 19900, // ₹199 in paise
    currency: "INR",
    period: "monthly",
  },
  enterprise: {
    name: "Enterprise",
    amount: 0, // Custom pricing - contact sales
    currency: "INR",
    period: "custom",
  },
}

export async function POST(request: NextRequest) {
  try {
    // Get user from session or JWT
    let userId: string | null = null

    // Try NextAuth session first
    const session = await auth()
    if (session?.user) {
      userId = session.user.id
    } else {
      // Try JWT token
      const token = request.cookies.get("auth-token")?.value
      if (token) {
        const decoded = verifyToken(token)
        if (decoded) {
          userId = decoded.userId
        }
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get plan from request body
    const { plan } = await request.json()

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 })
    }

    if (plan === "enterprise") {
      return NextResponse.json(
        { error: "Please contact sales for Enterprise plan" },
        { status: 400 }
      )
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS]

    // Connect to database
    await dbConnect()

    // Get user details
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Create Razorpay order
    // Receipt must be max 40 characters - use short format
    const timestamp = Date.now().toString().slice(-8) // Last 8 digits
    const userIdShort = userId.slice(-8) // Last 8 chars of userId
    const receipt = `ord_${userIdShort}_${timestamp}` // Format: ord_12345678_12345678 (max 28 chars)
    
    const options = {
      amount: selectedPlan.amount,
      currency: selectedPlan.currency,
      receipt: receipt,
      notes: {
        userId: userId,
        plan: plan,
        planName: selectedPlan.name,
        userEmail: user.email,
        userName: user.name,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        plan: selectedPlan,
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Razorpay order creation error:", error)
    console.error("Error details:", {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error,
      stack: error.stack
    })
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        error: error.message || "Failed to create order",
        details: error.error?.description || error.description || "Unknown error",
        razorpayError: error.error || null
      },
      { status: 500 }
    )
  }
}
