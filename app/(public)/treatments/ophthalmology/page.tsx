import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Ophthalmology in South Africa - Eye Surgery & Vision Correction | ApexMed',
  description: 'Expert eye surgery in South Africa. LASIK, cataract surgery, glaucoma treatment, retinal surgery, corneal transplant. Leading ophthalmologists.',
  keywords: ['ophthalmology South Africa', 'eye surgery', 'LASIK', 'cataract surgery', 'glaucoma treatment', 'retinal surgery', 'vision correction'],
  openGraph: {
    title: 'Ophthalmology | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/ophthalmology',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/ophthalmology',
  },
}

const procedures = [
  "Phacoemulsification (Cataract Surgery) with Premium IOLs",
  "LASIK / PRK / SMILE (Refractive Surgery)",
  "Vitrectomy (for Retinal Detachment, Diabetic Retinopathy)",
  "Trabeculectomy / Glaucoma Drainage Devices",
  "Pterygium Excision with Graft",
  "Corneal Transplant (Penetrating / Endothelial)",
  "Strabismus (Squint) Surgery",
]

export default function OphthalmologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Ophthalmology',
    description: 'Comprehensive eye care and vision correction services',
    procedureType: procedures,
    medicalSpecialty: 'Ophthalmology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Ophthalmology"
        description="Comprehensive eye care and vision correction services using advanced surgical techniques."
        procedures={procedures}
      />
    </>
  )
}
