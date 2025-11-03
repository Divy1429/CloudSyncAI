import mongoose, { Schema, type Document } from "mongoose"

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "inactive" | "cancelled" | "expired"
  razorpaySubscriptionId?: string
  razorpayPaymentId?: string
  razorpayOrderId?: string
  amount: number
  currency: string
  startDate: Date
  endDate: Date
  autoRenew: boolean
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: ["starter", "professional", "enterprise"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "expired"],
      default: "inactive",
    },
    razorpaySubscriptionId: {
      type: String,
      sparse: true,
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
    },
    razorpayOrderId: {
      type: String,
      sparse: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Subscription || mongoose.model<ISubscription>("Subscription", SubscriptionSchema)
