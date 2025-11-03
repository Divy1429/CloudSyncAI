import "./globals.css"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "CloudSync AI - AI-Powered Data Sync & Automation",
  description: "CloudSync AI: Intelligent data synchronization and automation platform for modern enterprises.",
  generator: "v0.app",
  icons: {
    icon: "/FullLogo1.jpg", // your main site icon
    shortcut: "/FullLogo1.jpg"
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
