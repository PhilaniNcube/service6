import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Surgical Oncology in South Africa - Cancer Surgery Specialists | ApexMed',
  description: 'Expert cancer surgery. Mastectomy, prostatectomy, colectomy, gastrectomy, liver resection, Whipple procedure. Multidisciplinary cancer care.',
  keywords: ['surgical oncology South Africa', 'cancer surgery', 'mastectomy', 'prostatectomy', 'colorectal cancer surgery', 'liver resection', 'pancreatic surgery'],
  openGraph: {
    title: 'Surgical Oncology | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/surgical-oncology',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/surgical-oncology',
  },
}

const procedures = [
  "Lumpectomy / Mastectomy (with Reconstruction options)",
  "Radical Prostatectomy",
  "Colectomy / Rectal Resection",
  "Gastrectomy",
  "Pancreatectomy (Whipple Procedure)",
  "Hepatectomy (Liver Resection)",
  "Cytoreductive Surgery with HIPEC (for peritoneal cancers)",
]

export default function SurgicalOncologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Surgical Oncology',
    description: 'Multidisciplinary surgical cancer care',
    procedureType: procedures,
    medicalSpecialty: 'Surgical Oncology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Surgical Oncology"
        description="Multidisciplinary surgical cancer care tailored to each patient's specific needs and condition."
        procedures={procedures}
      />
    </>
  )
}
