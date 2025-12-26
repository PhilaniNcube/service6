import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'HPB Surgery in South Africa - Liver, Pancreas & Bile Duct Surgery | ApexMed',
  description: 'Expert hepatopancreatobiliary surgery. Whipple procedure, liver resection, pancreatic surgery, bile duct surgery. Specialized HPB surgeons.',
  keywords: ['HPB surgery South Africa', 'liver surgery', 'pancreatic surgery', 'Whipple procedure', 'bile duct surgery', 'hepatectomy'],
  openGraph: {
    title: 'HPB Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/hpb-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/hpb-surgery',
  },
}

const procedures = [
  "Hepatectomy (Liver Resection)",
  "Whipple Procedure (Pancreaticoduodenectomy)",
  "Distal Pancreatectomy",
  "Cholecystectomy (Laparoscopic and Open)",
  "Bile Duct Exploration and Reconstruction",
  "Surgery for Portal Hypertension (Shunt Procedures)",
  "Radiofrequency Ablation (RFA) of Liver Tumors",
  "Surgery for Chronic Pancreatitis (Frey, Puestow procedures)",
  "Resection of Cholangiocarcinoma (Klatskin Tumor)",
]

export default function HPBSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'HPB (Hepatopancreatobiliary) Surgery',
    description: 'Complex surgical procedures for liver, pancreas, gallbladder, and bile ducts',
    procedureType: procedures,
    medicalSpecialty: 'Hepatopancreatobiliary Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="HPB (Hepatopancreatobiliary) Surgery"
        description="Complex surgical procedures for diseases of the liver, pancreas, gallbladder, and bile ducts, performed by highly specialized surgeons."
        procedures={procedures}
      />
    </>
  )
}
