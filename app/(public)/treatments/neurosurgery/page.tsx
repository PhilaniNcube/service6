import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Neurosurgery in South Africa - Brain & Spine Surgery | ApexMed',
  description: 'Expert neurosurgery in South Africa. Brain tumor surgery, spinal surgery, aneurysm treatment, deep brain stimulation. Leading neurosurgeons.',
  keywords: ['neurosurgery South Africa', 'brain surgery', 'spine surgery', 'tumor resection', 'spinal fusion', 'DBS', 'aneurysm treatment'],
  openGraph: {
    title: 'Neurosurgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/neurosurgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/neurosurgery',
  },
}

const procedures = [
  "Craniotomy for Tumor Resection",
  "Pituitary Tumor Surgery (Transsphenoidal)",
  "Cerebral Aneurysm Clipping / Coiling",
  "Deep Brain Stimulation (DBS) Implantation",
  "Microdiscectomy / Laminectomy",
  "Spinal Fusion",
  "Carpal Tunnel Release (Endoscopic)",
  "Chiari Decompression",
]

export default function NeurosurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Neurosurgery',
    description: 'Advanced surgical interventions for brain, spinal cord, and nervous system disorders',
    procedureType: procedures,
    medicalSpecialty: 'Neurosurgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Neurosurgery"
        description="Advanced surgical interventions for specific disorders of the brain, spinal cord, spinal column, and peripheral nerves throughout all parts of the body."
        procedures={procedures}
      />
    </>
  )
}
