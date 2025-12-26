import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'ENT Surgery in South Africa - Ear, Nose & Throat Specialists | ApexMed',
  description: 'Expert ENT surgery in South Africa. Sinus surgery, tonsillectomy, septoplasty, cochlear implants, thyroid surgery. Leading otolaryngologists.',
  keywords: ['ENT surgery South Africa', 'otolaryngology', 'sinus surgery', 'tonsillectomy', 'septoplasty', 'cochlear implant', 'thyroid surgery'],
  openGraph: {
    title: 'ENT Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/ent',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/ent',
  },
}

const procedures = [
  "Tonsillectomy / Adenoidectomy",
  "Functional Endoscopic Sinus Surgery (FESS)",
  "Septoplasty / Rhinoplasty",
  "Thyroidectomy / Parathyroidectomy",
  "Tympanoplasty / Mastoidectomy",
  "Stapedectomy",
  "Cochlear Implantation",
  "Laryngectomy / Pharyngectomy (for cancer)",
]

export default function ENTPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'ENT (Otolaryngology)',
    description: 'Expert diagnosis and treatment for ear, nose, throat, head, and neck disorders',
    procedureType: procedures,
    medicalSpecialty: 'Otolaryngology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="ENT (Otolaryngology)"
        description="Expert diagnosis and treatment for disorders of the ear, nose, throat, head, and neck region."
        procedures={procedures}
      />
    </>
  )
}
