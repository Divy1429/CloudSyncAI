import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | CloudSync AI",
  description: "Privacy Policy for CloudSync AI - Learn how we collect, use, and protect your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: November 3, 2025</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to CloudSync AI ("we," "our," or "us"). We are committed to protecting your personal 
                information and your right to privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our cloud synchronization platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">2.1 Personal Information</h3>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address</li>
                <li>Account credentials (encrypted passwords)</li>
                <li>Profile information and profile picture</li>
                <li>Payment information (processed securely through Razorpay)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">2.2 OAuth Information</h3>
              <p className="mb-4">When you sign in using OAuth providers (Google, GitHub):</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Basic profile information (name, email, profile picture)</li>
                <li>OAuth provider account ID</li>
                <li>Email verification status</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">2.3 Usage Information</h3>
              <p className="mb-4">We automatically collect certain information, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (features used, time spent, interactions)</li>
                <li>Activity logs (login times, workflow executions, integration activities)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">2.4 Cloud Integration Data</h3>
              <p className="mb-4">When you connect cloud services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>API keys and access tokens (encrypted)</li>
                <li>Connected service names and types</li>
                <li>Synchronization logs and metadata</li>
                <li>File names and folder structures (we do not access file contents unless explicitly authorized)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing your transactions and managing subscriptions</li>
                <li>Sending you technical notices, updates, and security alerts</li>
                <li>Responding to your comments, questions, and customer service requests</li>
                <li>Monitoring and analyzing usage patterns and trends</li>
                <li>Detecting, preventing, and addressing technical issues and security threats</li>
                <li>Personalizing your experience and providing relevant content</li>
                <li>Sending marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Security</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">4.1 Data Storage</h3>
              <p className="mb-4">
                Your data is stored securely using MongoDB Atlas with encryption at rest. We use 
                industry-standard security measures to protect your information.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">4.2 Security Measures</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure password hashing using bcrypt</li>
                <li>JWT-based authentication with secure token management</li>
                <li>Regular security audits and updates</li>
                <li>HTTPS encryption for all data transmission</li>
                <li>API key encryption for cloud integrations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p className="mb-4">We do not sell your personal information. We may share your information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>With your consent:</strong> When you authorize us to share specific information</li>
                <li><strong>Service providers:</strong> Third-party vendors who perform services on our behalf (e.g., Razorpay for payments, Vercel for hosting)</li>
                <li><strong>Legal requirements:</strong> When required by law, legal process, or government request</li>
                <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Services</h2>
              <p className="mb-4">Our service integrates with third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>OAuth Providers:</strong> Google, GitHub (for authentication)</li>
                <li><strong>Payment Processing:</strong> Razorpay (for secure payment processing)</li>
                <li><strong>Cloud Storage:</strong> Google Drive, Dropbox, OneDrive (as per your integrations)</li>
                <li><strong>Hosting:</strong> Vercel (for application hosting)</li>
                <li><strong>Database:</strong> MongoDB Atlas (for data storage)</li>
              </ul>
              <p className="mt-4">
                Each third-party service has its own privacy policy. We encourage you to review their 
                policies to understand how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights and Choices</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Data portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Revoke consent:</strong> Withdraw consent for data processing (where applicable)</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@cloudsyncai.com" className="text-blue-400 hover:text-blue-300 underline">privacy@cloudsyncai.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and 
                fulfill the purposes outlined in this Privacy Policy. When you delete your account, we will 
                delete or anonymize your personal information within 30 days, except where we are required 
                to retain it for legal or regulatory purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain your session and keep you logged in</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze site usage and improve performance</li>
                <li>Provide personalized content and features</li>
              </ul>
              <p className="mt-4">
                You can control cookies through your browser settings. However, disabling cookies may 
                affect the functionality of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our service is not intended for users under the age of 18. We do not knowingly collect 
                personal information from children. If you believe we have collected information from a 
                child, please contact us immediately, and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country 
                of residence. These countries may have different data protection laws. By using our service, 
                you consent to the transfer of your information to our facilities and service providers 
                globally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant 
                changes by posting the new policy on this page and updating the "Last updated" date. We 
                encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                data practices, please contact us:
              </p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:privacy@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">privacy@cloudsyncai.com</a></p>
                <p className="mb-2"><strong>Support:</strong> <a href="mailto:support@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">support@cloudsyncai.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact Us</Link></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
