import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Urology in South Africa - Prostate, Kidney & Bladder Surgery | ApexMed',
  description: 'Expert urology care. Robotic prostatectomy, kidney surgery, bladder cancer treatment, kidney stones, BPH treatment. Leading urologists.',
  keywords: ['urology South Africa', 'prostate surgery', 'kidney surgery', 'bladder cancer', 'kidney stones', 'BPH treatment', 'robotic prostatectomy'],
  openGraph: {
    title: 'Urology | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/urology',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/urology',
  },
}

const procedures = [
  "Robotic-Assisted Laparoscopic Prostatectomy (RALP)",
  "Radical Nephrectomy / Partial Nephrectomy",
  "Cystectomy (for Bladder Cancer)",
  "TURP / HoLEP / Laser Enucleation (for BPH)",
  "Percutaneous Nephrolithotomy (PCNL) for Kidney Stones",
  "Ureteroscopy with Laser Lithotripsy",
  "Penile Implant (Prosthesis) Surgery",
  "Vasectomy / Vasectomy Reversal",
]

export default function UrologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Urology',
    description: 'State-of-the-art urological care',
    procedureType: procedures,
    medicalSpecialty: 'Urology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Urology"
        description="State-of-the-art urological care for men and women, treating conditions of the kidney, bladder, and reproductive system."
        procedures={procedures}
      />
    </>
  )
}
