import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/db"
import Subscription from "@/models/Subscription"
import { verifyToken } from "@/lib/jwt"
import { createActivityLog } from "@/lib/activity"

export async function POST(request: NextRequest) {
  try {
    // Get user from session or JWT
    let userId: string | null = null

    const session = await auth()
    if (session?.user) {
      userId = session.user.id
    } else {
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

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan, amount } =
      await request.json()

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Connect to database
    await dbConnect()

    // Calculate subscription dates
    const startDate = new Date()
    const endDate = new Date()
    endDate.setMonth(endDate.getMonth() + 1) // 1 month subscription

    // Create or update subscription
    const subscription = await Subscription.findOneAndUpdate(
      { userId },
      {
        userId,
        plan,
        status: "active",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: amount / 100, // Convert paise to rupees
        currency: "INR",
        startDate,
        endDate,
        autoRenew: true,
      },
      { upsert: true, new: true }
    )

    // Log activity
    await createActivityLog({
      userId,
      action: "subscription.created",
      description: `Subscribed to ${plan} plan`,
      metadata: {
        plan,
        amount: amount / 100,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Payment verified successfully",
        subscription: {
          id: subscription._id,
          plan: subscription.plan,
          status: subscription.status,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Payment verification error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to verify payment" },
      { status: 500 }
    )
  }
}
