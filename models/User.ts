import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  provider?: string
  googleId?: string
  githubId?: string
  image?: string
  emailVerified?: Date
  subscription?: {
    plan: string
    status: string
    startDate: Date
    endDate?: Date
    razorpaySubscriptionId?: string
  }
  createdAt: Date
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: false, // Optional for OAuth users
    minlength: [6, "Password should be at least 6 characters"],
    select: false,
  },
  provider: {
    type: String,
    enum: ["credentials", "google", "github"],
    default: "credentials",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
  subscription: {
    plan: {
      type: String,
      enum: ["starter", "professional", "enterprise"],
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    razorpaySubscriptionId: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
