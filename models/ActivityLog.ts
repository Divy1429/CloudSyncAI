import mongoose from "mongoose"

const ActivityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "user.login",
        "user.logout",
        "user.signup",
        "user.profile.update",
        "user.password.change",
        "workflow.create",
        "workflow.update",
        "workflow.delete",
        "workflow.run",
        "integration.create",
        "integration.update",
        "integration.delete",
        "integration.sync",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
ActivityLogSchema.index({ userId: 1, createdAt: -1 })
ActivityLogSchema.index({ action: 1 })

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema)
