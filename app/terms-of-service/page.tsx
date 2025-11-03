import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | CloudSync AI",
  description: "Terms of Service for CloudSync AI - Read our terms and conditions for using our platform.",
}

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400 mb-8">Last updated: November 3, 2025</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using CloudSync AI ("Service", "Platform", "we", "us", or "our"), you agree 
                to be bound by these Terms of Service ("Terms"). If you disagree with any part of these 
                terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="mb-4">
                CloudSync AI provides a cloud synchronization and automation platform that allows users to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Connect and synchronize multiple cloud storage services</li>
                <li>Create automated workflows and data pipelines</li>
                <li>Monitor and manage cloud integrations</li>
                <li>Access real-time sync dashboards and analytics</li>
                <li>Utilize AI-powered automation features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">3.1 Account Registration</h3>
              <p className="mb-4">To use certain features, you must register an account. You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">3.2 Account Eligibility</h3>
              <p>
                You must be at least 18 years old to use this Service. By using the Service, you represent 
                and warrant that you meet this age requirement.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">3.3 Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate your account at any time for violations of 
                these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use Policy</h2>
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Scrape, spider, or harvest information from the Service</li>
                <li>Impersonate any person or entity</li>
                <li>Share your account credentials with others</li>
                <li>Resell or redistribute the Service without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Subscription Plans and Payments</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">5.1 Pricing</h3>
              <p className="mb-4">We offer various subscription plans with different features and pricing:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Free Plan:</strong> Limited features with basic cloud synchronization</li>
                <li><strong>Pro Plan:</strong> Advanced features including AI automation</li>
                <li><strong>Enterprise Plan:</strong> Full features with priority support</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">5.2 Payment Processing</h3>
              <p className="mb-4">
                All payments are processed securely through Razorpay. By making a purchase, you agree to 
                Razorpay's terms and conditions. We do not store your complete credit card information.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">5.3 Billing</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscriptions are billed monthly or annually based on your selection</li>
                <li>Payments are automatically charged at the start of each billing period</li>
                <li>You are responsible for all applicable taxes</li>
                <li>We reserve the right to change prices with 30 days' notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">5.4 Cancellation</h3>
              <p>
                You may cancel your subscription at any time. Cancellations take effect at the end of the 
                current billing period. No refunds are provided for partial months or unused service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Refund Policy</h2>
              <p className="mb-4">
                Please refer to our <Link href="/refund-policy" className="text-blue-400 hover:text-blue-300 underline">Refund Policy</Link> page for detailed information about refunds and cancellations.
              </p>
              <p className="mb-4">General refund terms:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>7-day money-back guarantee for new subscriptions</li>
                <li>No refunds for renewals or after 7 days</li>
                <li>Refunds processed within 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property Rights</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">7.1 Our Content</h3>
              <p className="mb-4">
                The Service and its original content, features, and functionality are owned by CloudSync AI 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">7.2 Your Content</h3>
              <p className="mb-4">
                You retain all rights to the content you upload or sync through our Service. By using the 
                Service, you grant us a limited license to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Store and process your content to provide the Service</li>
                <li>Create backups and ensure data redundancy</li>
                <li>Perform synchronization and automation tasks</li>
              </ul>
              <p className="mt-4">
                We do not claim ownership of your content and will not use it for any purpose other than 
                providing the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Integrations</h2>
              <p className="mb-4">
                Our Service integrates with third-party cloud storage providers (Google Drive, Dropbox, 
                OneDrive, etc.). You acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must comply with each provider's terms of service</li>
                <li>We are not responsible for third-party service availability</li>
                <li>Integration functionality depends on third-party APIs</li>
                <li>Third-party services may change or discontinue without notice</li>
                <li>You grant necessary permissions for integrations to function</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Data Privacy and Security</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> to 
                understand how we collect, use, and protect your information.
              </p>
              <p className="mb-4">Key security features:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure API key storage</li>
                <li>Regular security audits</li>
                <li>HTTPS encryption for all communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Service Availability</h2>
              <p className="mb-4">
                While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the Service. 
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Perform scheduled maintenance (with advance notice)</li>
                <li>Make emergency updates or repairs</li>
                <li>Modify or discontinue features</li>
                <li>Implement usage limits or restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Disclaimers and Limitations of Liability</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">11.1 Disclaimer</h3>
              <p className="mb-4">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR 
                A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">11.2 Limitation of Liability</h3>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLOUDSYNC AI SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
                WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
                INTANGIBLE LOSSES.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">11.3 Data Loss</h3>
              <p>
                While we implement robust backup systems, we are not liable for any data loss. You are 
                responsible for maintaining your own backups of important data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless CloudSync AI and its officers, directors, 
                employees, and agents from any claims, liabilities, damages, losses, and expenses arising 
                from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant 
                changes via email or through the Service. Your continued use of the Service after changes 
                constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, 
                without regard to its conflict of law provisions. Any disputes shall be resolved in the 
                courts of India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:legal@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">legal@cloudsyncai.com</a></p>
                <p className="mb-2"><strong>Support:</strong> <a href="mailto:support@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">support@cloudsyncai.com</a></p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact Us</Link></p>
              </div>
            </section>

            <section className="mt-12 pt-8 border-t border-slate-700">
              <p className="text-sm text-slate-400">
                By using CloudSync AI, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
