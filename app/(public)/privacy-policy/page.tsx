"use cache"

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ApexMed',
  description: 'Privacy Policy for ApexMed Medical Tourism',
}

export default async function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-muted-foreground">
        <p className="text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
          <p>
            Welcome to ApexMed (&#34;we,&#34; &#34;our,&#34; or &#34;us&#34;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the Website or otherwise contacting us.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and Contact Data</li>
            <li>Health Information (for medical tourism inquiries)</li>
            <li>Credentials (passwords, password hints, and similar security information)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">4. Cookies and Web Beacons</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email us at support@apexmedsa.co.za
          </p>
        </section>
      </div>
    </div>
  )
}
