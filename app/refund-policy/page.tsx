import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | CloudSync AI",
  description: "Refund and Cancellation Policy for CloudSync AI - Learn about our refund process and cancellation terms.",
}

export default function RefundPolicyPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">Refund & Cancellation Policy</h1>
          <p className="text-slate-400 mb-8">Last updated: November 3, 2025</p>

          <div className="space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Overview</h2>
              <p>
                At CloudSync AI, we strive to provide the best cloud synchronization experience. This 
                Refund & Cancellation Policy outlines the terms and conditions for refunds and 
                cancellations of our subscription services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. 7-Day Money-Back Guarantee</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">2.1 Eligibility</h3>
              <p className="mb-4">
                We offer a 7-day money-back guarantee for <strong>new subscriptions only</strong>. 
                This applies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>First-time subscribers to any paid plan (Pro or Enterprise)</li>
                <li>Subscriptions within 7 days of the initial purchase date</li>
                <li>Monthly or annual subscription plans</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">2.2 How to Request</h3>
              <p className="mb-4">To request a refund within the 7-day period:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact us at <a href="mailto:support@cloudsyncai.com" className="text-blue-400 hover:text-blue-300 underline">support@cloudsyncai.com</a></li>
                <li>Include your account email and reason for the refund</li>
                <li>We will process your request within 24-48 hours</li>
                <li>Refunds are credited back to the original payment method within 5-7 business days</li>
              </ol>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">2.3 Conditions</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The 7-day period starts from the date of purchase</li>
                <li>You must not have violated our Terms of Service</li>
                <li>Excessive refund requests may result in account restrictions</li>
                <li>Refunds are issued in the original currency of purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Subscription Renewals</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">3.1 No Refunds for Renewals</h3>
              <p className="mb-4">
                <strong>Refunds are NOT available for subscription renewals.</strong> This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Monthly subscription renewals (after the first month)</li>
                <li>Annual subscription renewals (after the first year)</li>
                <li>Auto-renewed subscriptions</li>
                <li>Plan upgrades or downgrades</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">3.2 Managing Auto-Renewal</h3>
              <p className="mb-4">To avoid unwanted charges:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancel your subscription before the renewal date</li>
                <li>Check your account settings for renewal status</li>
                <li>You will receive a reminder email 3 days before renewal</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Cancellation Policy</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">4.1 How to Cancel</h3>
              <p className="mb-4">You can cancel your subscription at any time through:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>Account Dashboard:</strong> Go to Profile → Subscription → Cancel Subscription</li>
                <li><strong>Email:</strong> Contact <a href="mailto:support@cloudsyncai.com" className="text-blue-400 hover:text-blue-300 underline">support@cloudsyncai.com</a> with your cancellation request</li>
              </ol>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">4.2 Cancellation Terms</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Immediate Effect:</strong> Your subscription will remain active until the end of the current billing period</li>
                <li><strong>Access:</strong> You retain full access to premium features until the subscription expires</li>
                <li><strong>No Partial Refunds:</strong> You will not receive a refund for the unused portion of your subscription</li>
                <li><strong>Data Retention:</strong> Your data is retained for 30 days after cancellation</li>
                <li><strong>Reactivation:</strong> You can reactivate your subscription at any time</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">4.3 What Happens After Cancellation</h3>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="mb-2"><strong>Immediately:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>Auto-renewal is disabled</li>
                  <li>You receive a cancellation confirmation email</li>
                </ul>
                <p className="mb-2"><strong>End of Billing Period:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                  <li>Account downgrades to Free plan</li>
                  <li>Premium features are disabled</li>
                  <li>Workflow executions are limited</li>
                  <li>Cloud storage connections remain (with free tier limits)</li>
                </ul>
                <p className="mb-2"><strong>After 30 Days:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Unused data may be archived or deleted</li>
                  <li>You can still log in to export your data</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Exceptions and Special Cases</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">5.1 Service Outages</h3>
              <p className="mb-4">
                If we experience significant service outages (more than 48 consecutive hours), you may 
                be eligible for a pro-rated refund or service credit at our discretion.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">5.2 Billing Errors</h3>
              <p className="mb-4">
                If you believe you've been charged incorrectly:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact us within 30 days of the charge</li>
                <li>Provide transaction details and explanation</li>
                <li>We will investigate and issue a refund if an error occurred</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">5.3 Fraudulent Activity</h3>
              <p>
                Accounts flagged for fraudulent activity, Terms of Service violations, or abuse of the 
                refund policy will not be eligible for refunds and may be permanently suspended.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Plan Changes</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">6.1 Upgrades</h3>
              <p className="mb-4">
                When upgrading from a lower to a higher plan:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Changes take effect immediately</li>
                <li>You are charged the pro-rated difference</li>
                <li>The new billing cycle starts from the upgrade date</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">6.2 Downgrades</h3>
              <p className="mb-4">
                When downgrading from a higher to a lower plan:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Changes take effect at the end of the current billing period</li>
                <li>No refunds are provided for the difference</li>
                <li>You retain premium features until the current period ends</li>
                <li>Data exceeding free tier limits may be restricted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Payment Processing</h2>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">7.1 Razorpay Processing</h3>
              <p className="mb-4">
                All payments are processed through Razorpay, our secure payment gateway. Refunds are 
                subject to Razorpay's processing times and policies.
              </p>

              <h3 className="text-xl font-semibold text-blue-400 mb-2">7.2 Refund Timeline</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Processing:</strong> 24-48 hours for approval</li>
                <li><strong>Bank Transfer:</strong> 5-7 business days to reflect in your account</li>
                <li><strong>Credit Card:</strong> 1-2 billing cycles</li>
                <li><strong>UPI/Wallet:</strong> 3-5 business days</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-400 mb-2 mt-4">7.3 Currency Conversion</h3>
              <p>
                Refunds are issued in the original currency. If your bank or payment method applies 
                currency conversion fees, those are not refundable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Free Plan</h2>
              <p className="mb-4">
                The Free plan has no refund or cancellation implications as there are no charges. 
                However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You can delete your account at any time</li>
                <li>Data will be retained for 30 days after account deletion</li>
                <li>You can upgrade to a paid plan at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Enterprise Plans</h2>
              <p className="mb-4">
                Enterprise plans may have custom refund and cancellation terms based on the contract. 
                Please refer to your specific agreement or contact our sales team at 
                <a href="mailto:enterprise@cloudsyncai.com" className="text-blue-400 hover:text-blue-300 underline ml-1">enterprise@cloudsyncai.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
              <p className="mb-4">
                For questions about refunds, cancellations, or billing:
              </p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <p className="mb-2"><strong>Support Email:</strong> <a href="mailto:support@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">support@cloudsyncai.com</a></p>
                <p className="mb-2"><strong>Billing Email:</strong> <a href="mailto:billing@cloudsyncai.com" className="text-blue-400 hover:text-blue-300">billing@cloudsyncai.com</a></p>
                <p className="mb-2"><strong>Response Time:</strong> Within 24-48 hours</p>
                <p><strong>Contact Page:</strong> <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">Contact Us</Link></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Policy Updates</h2>
              <p>
                We reserve the right to modify this Refund & Cancellation Policy at any time. Changes 
                will be posted on this page with an updated "Last updated" date. Continued use of the 
                Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-slate-700">
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <p className="text-sm text-blue-300 font-semibold mb-2">Important Reminder:</p>
                <p className="text-sm text-slate-300">
                  To avoid charges, cancel your subscription before the renewal date. You will continue 
                  to have access until the end of your current billing period.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
