"use client"

const teamMembers = [
  { id: 1, name: "Sarah", avatar: "👩", role: "Admin", status: "online" },
  { id: 2, name: "James", avatar: "👨", role: "Editor", status: "online" },
  { id: 3, name: "Maria", avatar: "👩‍🦱", role: "Viewer", status: "away" },
  { id: 4, name: "Alex", avatar: "👨‍💼", role: "Editor", status: "online" },
]

const activities = [
  "Sarah synced 5 files from Dropbox",
  "James created a new workflow template",
  "Maria updated project settings",
  "Alex reviewed sync logs",
]

export function TeamCollaboration() {
  return (
    <section className="relative min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Team Collaboration</h2>
          <p className="text-xl text-muted-foreground">
            Work together seamlessly. See who's online, what they're doing, and collaborate in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Team Members */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">Team Members</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-accent transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{member.avatar}</div>
                    <div>
                      <p className="font-medium text-card-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-yellow-500"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-secondary rounded-lg border border-border/50 hover:bg-accent transition-colors duration-200"
                >
                  <p className="text-sm text-card-foreground">{activity}</p>
                  <p className="text-xs text-muted-foreground mt-2">{Math.floor(Math.random() * 60)} minutes ago</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
