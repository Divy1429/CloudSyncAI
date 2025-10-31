"use client"

const templates = [
  {
    name: "Sync Dropbox to Google Drive",
    icon: "🔄",
    description: "Automatically sync files between Dropbox and Google Drive",
    steps: ["Dropbox", "CloudSync AI", "Google Drive"],
  },
  {
    name: "Email to Notion Database",
    icon: "📧",
    description: "Convert emails into Notion database entries",
    steps: ["Email", "CloudSync AI", "Notion"],
  },
  {
    name: "Slack to Google Sheets",
    icon: "📊",
    description: "Log Slack messages to Google Sheets automatically",
    steps: ["Slack", "CloudSync AI", "Sheets"],
  },
  {
    name: "AWS S3 Backup",
    icon: "☁️",
    description: "Backup all files to AWS S3 on a schedule",
    steps: ["Local", "CloudSync AI", "AWS S3"],
  },
]

export function AutomationTemplates() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Pre-Built Automation Templates</h2>
          <p className="text-xl text-muted-foreground">
            Get started instantly with ready-made workflows. No configuration needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.name}
              className="group bg-card border border-border rounded-2xl p-8 hover:bg-secondary transition-all duration-300 hover:shadow-xl hover:shadow-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{template.icon}</div>
                <span className="px-3 py-1 bg-primary/10 text-foreground text-xs font-semibold rounded-full">
                  Popular
                </span>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{template.name}</h3>
              <p className="text-muted-foreground mb-6">{template.description}</p>

              <div className="flex items-center justify-between mb-6 text-sm">
                {template.steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-muted-foreground">{step}</span>
                    {index < template.steps.length - 1 && <span className="mx-3 text-border">→</span>}
                  </div>
                ))}
              </div>

              <button className="w-full px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-white/90 transition-colors duration-200 group-hover:translate-y-0.5">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
