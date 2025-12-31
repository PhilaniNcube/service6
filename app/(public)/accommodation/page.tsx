import type { Metadata } from 'next'
import React from 'react'
import { Bed, Home, MapPin, Shield, Clock, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accommodation Services - Pre & Post-Procedure Support | ApexMed',
  description:
    'ApexMed facilitates comfortable accommodation for international patients before and after medical procedures in South Africa. Quality lodging near top healthcare facilities with full support.',
  keywords: [
    'medical accommodation South Africa',
    'post-surgery lodging',
    'patient accommodation',
    'medical tourism accommodation',
    'recovery accommodation',
    'pre-procedure accommodation',
    'healthcare lodging',
    'patient housing',
  ],
  openGraph: {
    title: 'Accommodation Services - ApexMed Medical Tourism',
    description:
      'Comfortable and convenient accommodation for medical tourists in South Africa. We facilitate quality lodging near healthcare facilities for your recovery and comfort.',
    url: 'https://www.apexmedsa.co.za/accommodation',
    siteName: 'ApexMed',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accommodation Services - ApexMed',
    description:
      'Quality accommodation for international patients receiving medical care in South Africa.',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/accommodation',
  },
}

export default function AccommodationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Medical Accommodation Facilitation',
    description:
      'ApexMed facilitates comfortable accommodation for international patients before and after medical procedures in South Africa',
    provider: {
      '@type': 'Organization',
      name: 'ApexMed',
      url: 'https://www.apexmedsa.co.za',
    },
    areaServed: 'South Africa',
    serviceType: 'Medical Tourism Accommodation',
  }

  const features = [
    {
      icon: MapPin,
      title: 'Strategic Locations',
      description:
        'Accommodation conveniently located near top-rated hospitals and medical facilities for easy access to your appointments and procedures.',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description:
        'All accommodation options are carefully vetted for safety, cleanliness, and quality standards to ensure your peace of mind.',
    },
    {
      icon: Home,
      title: 'Comfortable Stay',
      description:
        'From hotels to serviced apartments, we arrange comfortable lodging suitable for your recovery period and personal preferences.',
    },
    {
      icon: Heart,
      title: 'Recovery-Focused',
      description:
        'Quiet, peaceful environments conducive to rest and recovery, with amenities designed for medical tourists.',
    },
    {
      icon: Clock,
      title: 'Flexible Duration',
      description:
        'Whether you need accommodation for a few days or several weeks, we facilitate stays that match your treatment timeline.',
    },
    {
      icon: Bed,
      title: 'Companion Accommodation',
      description:
        'Options available for family members or companions who wish to stay with you during your medical journey.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="bg-muted/30 py-20 md:py-32">
          <div className="container px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-6">
              Accommodation Services
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              Comfortable and convenient lodging for your medical journey in
              South Africa
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Your Comfort is Our Priority
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At ApexMed, we understand that quality accommodation is
                  essential for a successful medical journey. Whether you&apos;re
                  preparing for a procedure or recovering afterwards, having a
                  comfortable, safe, and conveniently located place to stay can
                  significantly impact your overall experience and recovery.
                </p>
                <p>
                  As part of our comprehensive medical tourism facilitation
                  services, we coordinate accommodation arrangements that meet
                  your specific needs. We work with a network of trusted
                  accommodation providers near major healthcare facilities
                  across South Africa, ensuring you have a peaceful environment
                  for rest and recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              What We Facilitate
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Types of Accommodation */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Accommodation Options
              </h2>
              <div className="space-y-8">
                <div className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-3">
                    Hotels & Guesthouses
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Comfortable hotel rooms or guesthouse accommodation with
                    daily housekeeping, room service, and amenities suitable for
                    recovery periods. Ideal for shorter stays or post-procedure
                    monitoring.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-3">
                    Serviced Apartments
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fully furnished apartments with kitchen facilities,
                    providing a home-away-from-home experience. Perfect for
                    extended stays or patients who prefer more independence
                    during recovery.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-6 py-2">
                  <h3 className="text-xl font-semibold mb-3">
                    Recovery Suites
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Specialized accommodation designed for post-surgical
                    recovery, often located within or very close to medical
                    facilities. May include additional support services and
                    medical monitoring capabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Needs Assessment
                      </h3>
                      <p className="text-muted-foreground">
                        We discuss your accommodation preferences, budget,
                        proximity requirements, and any special needs related to
                        your medical condition or recovery.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Matching & Booking
                      </h3>
                      <p className="text-muted-foreground">
                        We identify suitable accommodation options near your
                        treatment facility and coordinate the booking process on
                        your behalf, ensuring everything is ready for your
                        arrival.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Arrival & Check-In
                      </h3>
                      <p className="text-muted-foreground">
                        We arrange airport transfers and ensure smooth check-in
                        to your accommodation. Our team remains available for
                        any issues or adjustments needed during your stay.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Ongoing Support
                      </h3>
                      <p className="text-muted-foreground">
                        Throughout your stay, our 24/7 support team is available
                        to assist with any accommodation-related concerns or to
                        help extend your booking if needed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-16 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Important to Know
              </h2>
              <div className="bg-muted/30 p-8 rounded-lg space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">
                    Facilitation Service:
                  </strong>{' '}
                  ApexMed facilitates accommodation arrangements as part of our
                  comprehensive medical tourism service. We coordinate bookings
                  with trusted accommodation providers but do not own or operate
                  the accommodation facilities.
                </p>
                <p>
                  <strong className="text-foreground">
                    Advance Planning:
                  </strong>{' '}
                  We recommend discussing accommodation needs as early as
                  possible in your treatment planning process to ensure
                  availability and the best options for your situation.
                </p>
                <p>
                  <strong className="text-foreground">Costs:</strong>{' '}
                  Accommodation costs are separate from medical treatment costs
                  and vary based on your chosen accommodation type, location,
                  and duration of stay. We provide transparent pricing and
                  options to suit various budgets.
                </p>
                <p>
                  <strong className="text-foreground">
                    Special Requirements:
                  </strong>{' '}
                  If you have specific medical requirements such as wheelchair
                  accessibility, dietary needs, or other accommodations, please
                  inform us early so we can ensure suitable arrangements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Plan Your Medical Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let us help you arrange comfortable accommodation for your
              procedure and recovery in South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-background text-primary hover:bg-background/90 transition-colors"
              >
                Contact Us Today
              </Link>
              <Link
                href="/faqs"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground text-base font-medium rounded-md hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
