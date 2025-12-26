import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Cardiac Surgery in South Africa - Heart Surgery Specialists | ApexMed',
  description: 'World-class cardiac surgery in South Africa. CABG, valve replacement, TAVI, aneurysm repair. Expert heart surgeons, advanced facilities, affordable care.',
  keywords: ['cardiac surgery South Africa', 'heart surgery', 'CABG', 'valve replacement', 'TAVI', 'bypass surgery', 'heart valve repair'],
  openGraph: {
    title: 'Cardiac Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/cardiac-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/cardiac-surgery',
  },
}

const procedures = [
  "Coronary Artery Bypass Grafting (CABG)",
  "Aortic / Mitral Valve Repair or Replacement",
  "Transcatheter Aortic Valve Implantation (TAVI)",
  "Atrial Septal Defect (ASD) / Ventricular Septal Defect (VSD) Closure",
  "Aortic Aneurysm Repair (Open or Endovascular)",
  "Maze Procedure (for Atrial Fibrillation)",
]

export default function CardiacSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Cardiac Surgery',
    description: 'Advanced cardiac surgical procedures',
    procedureType: procedures,
    medicalSpecialty: 'Cardiac Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Cardiac Surgery"
        description="World-class cardiac surgical care featuring the latest techniques in heart valve repair and bypass surgery."
        procedures={procedures}
      />
    </>
  )
}
