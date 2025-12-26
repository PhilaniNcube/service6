import type { Metadata } from 'next'
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { Route } from "next"

export const metadata: Metadata = {
  title: 'Medical Tourism Insurance Guide - Essential Coverage for Healthcare Abroad | ApexMed',
  description: 'Complete guide to medical tourism insurance. Learn about essential coverage, what to look for, and how to protect yourself when traveling for healthcare abroad.',
  keywords: [
    'medical tourism insurance',
    'healthcare travel insurance',
    'surgery abroad insurance',
    'medical travel coverage',
    'international healthcare insurance',
    'travel medical insurance',
    'medical tourism guide',
    'patient safety abroad',
  ],
  openGraph: {
    title: 'ApexMed Medical Tourism Insurance Guide',
    description: 'Essential insurance coverage for medical tourism. Protect your health and investment when traveling for healthcare abroad.',
    url: 'https://www.apexmedsa.co.za/blog/medical-tourism-insurance-guide',
    siteName: 'ApexMed',
    images: [
      {
        url: '/images/blog/medical-tourism-insurance.png',
        width: 1200,
        height: 630,
        alt: 'Medical Tourism Insurance Guide',
      },
    ],
    type: 'article',
    publishedTime: '2025-12-20',
    authors: ['ApexMed'],
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/blog/medical-tourism-insurance-guide',
  },
}

export default function MedicalTourismInsuranceGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'ApexMed Medical Tourism Insurance Guide',
    description: 'Ensuring your safety, confidence, and peace of mind while receiving care abroad',
    image: 'https://www.apexmedsa.co.za/images/blog/medical-tourism-insurance.png',
    datePublished: '2025-12-20',
    dateModified: '2025-12-20',
    author: {
      '@type': 'Organization',
      name: 'ApexMed',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ApexMed',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.apexmedsa.co.za/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.apexmedsa.co.za/blog/medical-tourism-insurance-guide',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
      {/* Back to Blog Link */}
      <div className="container px-4 py-8">
        <Link 
          href={"/blog" as Route}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 mb-6">
              <Tag className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600">Patient Guide</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-6">
              ApexMed Medical Tourism Insurance Guide
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Ensuring Your Safety, Confidence, and Peace of Mind While Receiving Care Abroad
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>December 20, 2025</span>
              </div>
              <span>•</span>
              <span>6 min read</span>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/blog/medical-tourism-insurance.png"
                alt="Medical Tourism Insurance"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-xl font-medium text-foreground">
                At ApexMed, your wellbeing comes first. Traveling for medical treatment requires more than excellent healthcare — it requires the right insurance protection to ensure a smooth, safe, and stress-free experience.
              </p>
              <p>
                This guide outlines the essential insurance policies every medical tourist should have before traveling.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Medical Travel Insurance (Essential)</h2>
              <p>
                This is the most important insurance for anyone traveling for medical treatment. It protects you before, during, and shortly after your procedure.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">What it covers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Emergency medical care abroad</li>
                <li>Complications from your planned surgery</li>
                <li>Hospitalization and ICU care</li>
                <li>Repatriation if medically necessary</li>
                <li>Trip cancellation due to illness</li>
                <li>Emergency follow-up care</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Why you need it:</h3>
              <p>
                Most domestic health insurance policies do not cover elective procedures overseas.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Surgical Complications Insurance (Highly Recommended)</h2>
              <p>
                Even in world-class hospitals, unexpected complications can happen. This insurance ensures you&apos;re financially protected.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Covers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Surgical complications</li>
                <li>Additional hospital days</li>
                <li>Revision surgery</li>
                <li>Specialist consultations</li>
                <li>Emergency interventions</li>
              </ul>

              <p>
                <strong>Ideal for:</strong> cosmetic surgery, orthopedic implants, bariatric surgery, advanced general surgery, and all high-complexity procedures.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Medical Evacuation & Repatriation Insurance (Essential for All Travelers)</h2>
              <p>
                In the rare event of a medical emergency, this coverage ensures you can be transported safely.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Covers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Air ambulance services</li>
                <li>Transfer to a higher-level hospital</li>
                <li>Return home with medical supervision</li>
                <li>Repatriation in case of death</li>
              </ul>

              <p>
                Especially important for patients traveling from remote areas or undergoing major surgery.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">4. Travel Insurance (General Protection)</h2>
              <p>
                Medical tourism involves travel risks as well.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Covers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lost luggage and personal items</li>
                <li>Travel delays and missed connections</li>
                <li>Non-medical trip cancellations</li>
                <li>Travel disruptions due to unforeseen events</li>
              </ul>

              <p>
                Often packaged with medical travel insurance for convenience.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">5. International Health Insurance (For Longer Stays)</h2>
              <p>
                If you will be abroad for weeks or months of recovery, this optional coverage provides broader protection.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Covers:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Inpatient and outpatient care</li>
                <li>Medication</li>
                <li>Emergency treatment</li>
                <li>Chronic disease management</li>
              </ul>

              <p>
                Best for long-term rehabilitation or treatment cycles.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why Insurance Matters When Choosing ApexMed</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Peace of mind:</strong> You focus on healing, while we ensure your risks are covered.</li>
                <li><strong>Compliance:</strong> Many of our partner hospitals require valid insurance before admission.</li>
                <li><strong>Continuity of care:</strong> Covers you even if unexpected events extend your stay.</li>
                <li><strong>Financial protection:</strong> Prevents unexpected medical or travel expenses.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">ApexMed Support</h2>
              <p>Our team assists you with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Selecting the right insurance plan</li>
                <li>Verifying hospital requirements</li>
                <li>Connecting you with accredited insurers</li>
                <li>Coordinating claims if complications occur</li>
              </ul>

              <p className="text-foreground font-medium">
                Your safety is our priority.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 my-8 rounded-r-lg">
                <p className="text-foreground font-medium mb-2">Need help with insurance coverage?</p>
                <p className="text-sm">
                  Contact ApexMed today and we&apos;ll guide you through choosing the right protection for your medical journey.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
      </div>
    </>
  )
}
