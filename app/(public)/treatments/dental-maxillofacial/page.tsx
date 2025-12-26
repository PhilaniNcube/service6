import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Dental & Maxillofacial Surgery in South Africa | ApexMed',
  description: 'Expert dental and maxillofacial surgery. Dental implants, jaw surgery, bone grafting, facial reconstruction. All-on-4, wisdom teeth extraction.',
  keywords: ['dental surgery South Africa', 'maxillofacial surgery', 'dental implants', 'jaw surgery', 'All-on-4', 'bone grafting', 'facial reconstruction'],
  openGraph: {
    title: 'Dental & Maxillofacial Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/dental-maxillofacial',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/dental-maxillofacial',
  },
}

const procedures = [
  "Dental Implants (Single, All-on-4®)",
  "Orthognathic (Jaw Corrective) Surgery",
  "Bone Grafting",
  "Wisdom Tooth Extraction (Surgical)",
  "TMJ Disorder Surgery",
  "Facial Trauma Reconstruction",
  "Cleft Lip/Palate Repair",
]

export default function DentalMaxillofacialPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Dental & Maxillofacial Surgery',
    description: 'Specialized dental and facial surgical procedures',
    procedureType: procedures,
    medicalSpecialty: 'Maxillofacial Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Dental & Maxillofacial Surgery"
        description="Specialized facio-maxillary and dental surgical procedures to restore function and aesthetics."
        procedures={procedures}
      />
    </>
  )
}
