import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUserId } from "@/lib/auth-helper"

export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(request)

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { default: dbConnect } = await import("@/lib/db")
    const { default: Workflow } = await import("@/models/Workflow")
    const { default: Integration } = await import("@/models/Integration")
    const { default: ActivityLog } = await import("@/models/ActivityLog")

    await dbConnect()

    // Get workflow statistics
    const totalWorkflows = await Workflow.countDocuments({ userId })
    const activeWorkflows = await Workflow.countDocuments({ userId, status: "active" })
    const pausedWorkflows = await Workflow.countDocuments({ userId, status: "paused" })
    const draftWorkflows = await Workflow.countDocuments({ userId, status: "draft" })

    // Get total runs and success rate
    const workflows = await Workflow.find({ userId })
    const totalRuns = workflows.reduce((sum, w) => sum + (w.runCount || 0), 0)
    const totalSuccess = workflows.reduce((sum, w) => sum + (w.successCount || 0), 0)
    const totalFailures = workflows.reduce((sum, w) => sum + (w.failureCount || 0), 0)
    const successRate = totalRuns > 0 ? ((totalSuccess / totalRuns) * 100).toFixed(1) : 0

    // Get integration statistics
    const totalIntegrations = await Integration.countDocuments({ userId })
    const connectedIntegrations = await Integration.countDocuments({
      userId,
      status: "connected",
    })
    const disconnectedIntegrations = await Integration.countDocuments({
      userId,
      status: "disconnected",
    })

    // Get recent activities
    const recentActivities = await ActivityLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)

    // Get activity count by day (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const activityCount = await ActivityLog.countDocuments({
      userId,
      createdAt: { $gte: sevenDaysAgo },
    })

    return NextResponse.json(
      {
        success: true,
        stats: {
          workflows: {
            total: totalWorkflows,
            active: activeWorkflows,
            paused: pausedWorkflows,
            draft: draftWorkflows,
            totalRuns,
            successRate: parseFloat(successRate as string),
            totalSuccess,
            totalFailures,
          },
          integrations: {
            total: totalIntegrations,
            connected: connectedIntegrations,
            disconnected: disconnectedIntegrations,
          },
          activities: {
            recent: recentActivities,
            last7Days: activityCount,
          },
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get statistics error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
