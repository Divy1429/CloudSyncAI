import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/db"
import Subscription from "@/models/Subscription"
import { verifyToken } from "@/lib/jwt"

export async function GET(request: NextRequest) {
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

    await dbConnect()

    const subscription = await Subscription.findOne({ userId }).sort({ createdAt: -1 })

    if (!subscription) {
      return NextResponse.json(
        {
          success: true,
          subscription: null,
          message: "No active subscription",
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        subscription: {
          id: subscription._id,
          plan: subscription.plan,
          status: subscription.status,
          amount: subscription.amount,
          currency: subscription.currency,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          autoRenew: subscription.autoRenew,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Get subscription error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to get subscription" },
      { status: 500 }
    )
  }
}
