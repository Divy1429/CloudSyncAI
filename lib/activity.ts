import dbConnect from "./db"

export async function createActivityLog({
  userId,
  action,
  description,
  metadata = {},
  ipAddress,
  userAgent,
}: {
  userId: string
  action: string
  description: string
  metadata?: any
  ipAddress?: string
  userAgent?: string
}) {
  try {
    await dbConnect()
    const { default: ActivityLog } = await import("@/models/ActivityLog")

    await ActivityLog.create({
      userId,
      action,
      description,
      metadata,
      ipAddress,
      userAgent,
    })
  } catch (error) {
    console.error("Failed to create activity log:", error)
  }
}

export async function getUserActivities(userId: string, limit = 50) {
  try {
    await dbConnect()
    const { default: ActivityLog } = await import("@/models/ActivityLog")

    const activities = await ActivityLog.find({ userId }).sort({ createdAt: -1 }).limit(limit)

    return activities
  } catch (error) {
    console.error("Failed to get user activities:", error)
    return []
  }
}
