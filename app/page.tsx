import { MultiCloudConnections } from "@/components/multi-cloud-connections"
import { AnalyticsReports } from "@/components/analytics-reports"
import { SecureDataEncryption } from "@/components/secure-data-encryption"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RealTimeSyncDashboard } from "@/components/real-time-sync-dashboard"
import { AIWorkflowBuilder } from "@/components/ai-workflow-builder"
import { AnimatedFeaturesSection } from "@/components/animated-features-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { Footer } from "@/components/footer"
import { CustomIntegrations } from "@/components/custom-integrations"
import { AutomationTemplates } from "@/components/automation-templates"
import { SmartAlerts } from "@/components/smart-alerts"
import { VersionHistoryTimeline } from "@/components/version-history-timeline"
import { TeamCollaboration } from "@/components/team-collaboration"
import { UserDashboardPreview } from "@/components/user-dashboard-preview"
import { DataSyncMap } from "@/components/data-sync-map"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <RealTimeSyncDashboard />
        <AIWorkflowBuilder />
        <MultiCloudConnections />
        <AnalyticsReports />
        <SecureDataEncryption />
        <CustomIntegrations />
        <AutomationTemplates />
        <SmartAlerts />
        <VersionHistoryTimeline />
        <TeamCollaboration />
        <UserDashboardPreview />
        <DataSyncMap />
        {/* End new sections */}
        <AnimatedFeaturesSection />
        <PricingSection />
        <FAQSection />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
