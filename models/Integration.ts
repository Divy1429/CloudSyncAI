import mongoose from "mongoose"

const IntegrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Integration name is required"],
      trim: true,
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
      enum: ["aws", "azure", "gcp", "dropbox", "google-drive", "onedrive", "salesforce", "slack", "github", "custom"],
    },
    status: {
      type: String,
      enum: ["connected", "disconnected", "error"],
      default: "disconnected",
    },
    credentials: {
      type: mongoose.Schema.Types.Mixed,
      select: false, // Don't return credentials by default
    },
    config: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    lastSync: {
      type: Date,
    },
    syncCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
IntegrationSchema.index({ userId: 1, provider: 1 })
IntegrationSchema.index({ status: 1 })

export default mongoose.models.Integration || mongoose.model("Integration", IntegrationSchema)
