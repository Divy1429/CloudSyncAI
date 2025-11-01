import mongoose from "mongoose"

const WorkflowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Workflow name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "paused", "draft"],
      default: "draft",
    },
    trigger: {
      type: {
        type: String,
        enum: ["schedule", "webhook", "manual", "event"],
        default: "manual",
      },
      config: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    actions: [
      {
        type: String,
        actionType: String,
        config: mongoose.Schema.Types.Mixed,
        order: Number,
      },
    ],
    lastRun: {
      type: Date,
    },
    runCount: {
      type: Number,
      default: 0,
    },
    successCount: {
      type: Number,
      default: 0,
    },
    failureCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
WorkflowSchema.index({ userId: 1, status: 1 })
WorkflowSchema.index({ createdAt: -1 })

export default mongoose.models.Workflow || mongoose.model("Workflow", WorkflowSchema)
