import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Orthopaedic Surgery in South Africa - Joint Replacement & Spine Surgery | ApexMed',
  description: 'Expert orthopaedic surgery in South Africa. Hip replacement, knee replacement, spinal fusion, ACL reconstruction, and sports medicine. World-class specialists.',
  keywords: ['orthopaedic surgery South Africa', 'hip replacement', 'knee replacement', 'spinal surgery', 'ACL reconstruction', 'sports medicine', 'joint replacement'],
  openGraph: {
    title: 'Orthopaedic Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/orthopaedics',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/orthopaedics',
  },
}

const procedures = [
  "Total Hip Replacement",
  "Total Knee Replacement",
  "Shoulder Replacement",
  "Arthroscopic ACL Reconstruction",
  "Arthroscopic Meniscus Repair",
  "Rotator Cuff Repair",
  "Spinal Fusion (Lumbar/Cervical)",
  "Laminectomy / Discectomy",
  "Carpal Tunnel Release",
  "Complex Fracture Fixation",
]

export default function OrthopaedicsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Orthopaedic Surgery',
    description: 'Comprehensive orthopaedic surgical care',
    procedureType: procedures,
    medicalSpecialty: 'Orthopaedic Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Orthopaedic Surgery"
        description="Restore mobility and live pain-free with expert orthopaedic care, from joint replacements to sports medicine and spinal surgery."
        procedures={procedures}
      />
    </>
  )
}
