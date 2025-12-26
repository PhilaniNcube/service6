import type { Metadata } from 'next'
import { Hero } from './_components/hero'
import { Services } from './_components/services'
import { TouristTravel } from './_components/tourist-travel'
import { HowItWorks } from './_components/how-it-works'
import { WhyChooseUs } from './_components/why-choose-us'

export const metadata: Metadata = {
  title: 'ApexMed - Premium Medical Tourism in South Africa | World-Class Healthcare',
  description: 'Experience world-class medical care in South Africa with ApexMed. Connecting international patients to top surgeons, affordable procedures, and seamless medical tourism services.',
  keywords: [
    'medical tourism South Africa',
    'healthcare tourism',
    'medical travel Africa',
    'cosmetic surgery South Africa',
    'affordable surgery abroad',
    'international healthcare',
    'medical specialists South Africa',
    'surgery packages',
    'healthcare travel',
    'medical tourism company'
  ],
  openGraph: {
    title: 'ApexMed - Premium Medical Tourism in South Africa',
    description: 'Connecting international patients to world-class healthcare in South Africa. Expert surgeons, advanced facilities, and comprehensive medical tourism services.',
    url: 'https://www.apexmedsa.co.za',
    siteName: 'ApexMed',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ApexMed Medical Tourism',
      },
    ],
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexMed - Premium Medical Tourism in South Africa',
    description: 'World-class medical care in South Africa. Expert surgeons, affordable procedures, seamless service.',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za',
  },
  verification: {
    google: 'lAlV6hq1485RGeRGY0vvNIohSoCBcullHwkK6fwLJxw',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const page = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'ApexMed',
    description: 'Premier medical tourism company connecting international patients to world-class healthcare in South Africa',
    url: 'https://www.apexmedsa.co.za',
    logo: 'https://www.apexmedsa.co.za/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    medicalSpecialty: [
      'Plastic Surgery',
      'Orthopedic Surgery',
      'Cardiac Surgery',
      'Neurosurgery',
      'Ophthalmology',
      'Dental Surgery',
      'Bariatric Surgery',
      'General Surgery',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Hero />
        <Services />
        <TouristTravel />
        <HowItWorks />
        <WhyChooseUs />
      </div>
    </>
  )
}

export default page