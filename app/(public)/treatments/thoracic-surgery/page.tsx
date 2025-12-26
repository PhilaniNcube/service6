import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Thoracic Surgery in South Africa - Lung & Chest Surgery | ApexMed',
  description: 'Expert thoracic surgery. Lung cancer surgery, VATS, chest wall surgery, mediastinal tumor resection. Leading thoracic surgeons.',
  keywords: ['thoracic surgery South Africa', 'lung surgery', 'VATS', 'lung cancer surgery', 'chest surgery', 'mediastinal tumor'],
  openGraph: {
    title: 'Thoracic Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/thoracic-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/thoracic-surgery',
  },
}

const procedures = [
  "Lobectomy / Pneumonectomy (for Lung Cancer)",
  "Video-Assisted Thoracic Surgery (VATS)",
  "Pleurectomy / Decortication",
  "Mediastinal Tumor Resection",
  "Surgery for Pectus Excavatum",
  "Endoscopic Thoracic Sympathectomy (ETS) for Hyperhidrosis",
]

export default function ThoracicSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Thoracic Surgery',
    description: 'Advanced surgical treatment for organs within the chest',
    procedureType: procedures,
    medicalSpecialty: 'Thoracic Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Thoracic Surgery"
        description="Advanced surgical treatment for organs within the chest, including the lungs, esophagus, and chest wall."
        procedures={procedures}
      />
    </>
  )
}
