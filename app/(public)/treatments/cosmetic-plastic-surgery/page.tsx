import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Cosmetic & Plastic Surgery in South Africa | ApexMed',
  description: 'Premium cosmetic and plastic surgery in South Africa. Breast augmentation, tummy tuck, rhinoplasty, facelift, liposuction, and more. Expert surgeons, affordable prices.',
  keywords: ['cosmetic surgery South Africa', 'plastic surgery', 'breast augmentation', 'tummy tuck', 'rhinoplasty', 'liposuction', 'facelift', 'body contouring'],
  openGraph: {
    title: 'Cosmetic & Plastic Surgery | ApexMed',
    description: 'Premium cosmetic and plastic surgery with expert surgeons in South Africa.',
    url: 'https://www.apexmedsa.co.za/treatments/cosmetic-plastic-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/cosmetic-plastic-surgery',
  },
}

const procedures = [
  "Breast Augmentation (Implants)",
  "Breast Reduction",
  "Mastopexy (Breast Lift)",
  "Abdominoplasty (Tummy Tuck)",
  "Rhinoplasty",
  "Blepharoplasty (Eyelid Surgery)",
  "Rhytidectomy (Facelift)",
  "Liposuction & Body Contouring",
  "Brachioplasty (Arm Lift)",
  "Post-Bariatric Body Lifting",
  "Gynecomastia Surgery",
  "BBL (Brazilian Butt Lift)",
]

export default function CosmeticSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Cosmetic & Plastic Surgery',
    description: 'Comprehensive cosmetic and plastic surgery procedures',
    procedureType: procedures,
    medicalSpecialty: 'Plastic Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Cosmetic & Plastic Surgery"
        description="Enhance your natural beauty and boost your confidence with our comprehensive range of cosmetic and reconstructive procedures performed by world-class plastic surgeons."
        procedures={procedures}
      />
    </>
  )
}
