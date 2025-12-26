import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'General Surgery in South Africa - Laparoscopic & Minimally Invasive | ApexMed',
  description: 'Expert general surgery in South Africa. Laparoscopic procedures, hernia repair, gallbladder surgery, appendectomy, thyroid surgery. Experienced surgeons.',
  keywords: ['general surgery South Africa', 'laparoscopic surgery', 'hernia repair', 'gallbladder surgery', 'appendectomy', 'thyroid surgery'],
  openGraph: {
    title: 'General Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/general-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/general-surgery',
  },
}

const procedures = [
  "Laparoscopic Cholecystectomy (Gallbladder)",
  "Laparoscopic Appendectomy",
  "Hernia Repair (Inguinal, Umbilical, Hiatal)",
  "Gastric Sleeve / Gastric Bypass (Bariatric)",
  "Hemicolectomy (Colon Resection)",
  "Hemorrhoidectomy",
  "Thyroidectomy / Parathyroidectomy",
  "Splenectomy",
]

export default function GeneralSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'General Surgery',
    description: 'Comprehensive general surgical services',
    procedureType: procedures,
    medicalSpecialty: 'General Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="General Surgery"
        description="Comprehensive general surgical services focusing on the abdominal contents, including esophagus, stomach, small lung, colon, liver, pancreas, gallbladder requiring surgery."
        procedures={procedures}
      />
    </>
  )
}
