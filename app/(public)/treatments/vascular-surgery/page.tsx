import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Vascular Surgery in South Africa - Artery & Vein Treatment | ApexMed',
  description: 'Expert vascular surgery. Aneurysm repair, carotid surgery, peripheral artery bypass, varicose vein treatment, DVT surgery. Leading vascular surgeons.',
  keywords: ['vascular surgery South Africa', 'aneurysm repair', 'carotid surgery', 'varicose veins', 'peripheral artery disease', 'DVT treatment'],
  openGraph: {
    title: 'Vascular Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/vascular-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/vascular-surgery',
  },
}

const procedures = [
  "Endovascular Aneurysm Repair (EVAR/TEVAR)",
  "Open Abdominal Aortic Aneurysm (AAA) Repair",
  "Carotid Endarterectomy",
  "Peripheral Artery Bypass (Femoral-Popliteal, Aortobifemoral)",
  "Angioplasty and Stenting (Peripheral)",
  "Embolectomy / Thrombectomy",
  "Varicose Vein Ablation (Laser, Radiofrequency)",
  "Sclerotherapy",
  "AV Fistula Creation for Dialysis Access",
  "Surgery for Deep Vein Thrombosis (DVT)",
  "Sympathectomy (for Hyperhidrosis or CRPS)",
]

export default function VascularSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Vascular Surgery',
    description: 'Advanced vascular treatments for arteries, veins, and lymphatic system',
    procedureType: procedures,
    medicalSpecialty: 'Vascular Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Vascular Surgery"
        description="Advanced vascular treatments for conditions affecting your arteries, veins, and lymphatic system, improving circulation and vascular health."
        procedures={procedures}
      />
    </>
  )
}
