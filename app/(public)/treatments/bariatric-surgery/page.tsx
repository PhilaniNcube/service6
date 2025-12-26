import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Bariatric Surgery in South Africa - Weight Loss Surgery | ApexMed',
  description: 'Expert bariatric surgery for weight loss. Gastric sleeve, gastric bypass, lap band, gastric balloon. Affordable weight loss surgery with experienced surgeons.',
  keywords: ['bariatric surgery South Africa', 'weight loss surgery', 'gastric sleeve', 'gastric bypass', 'lap band', 'gastric balloon', 'obesity surgery'],
  openGraph: {
    title: 'Bariatric Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/bariatric-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/bariatric-surgery',
  },
}

const procedures = [
  {
    name: "Restrictive Procedures",
    subProcedures: [
      "Laparoscopic Sleeve Gastrectomy",
      "Adjustable Gastric Banding (Lap-Band)",
    ],
  },
  {
    name: "Malabsorptive/Restrictive Procedures",
    subProcedures: [
      "Roux-en-Y Gastric Bypass",
      "One-Anastomosis Gastric Bypass (Mini Gastric Bypass)",
    ],
  },
  {
    name: "Revision/Secondary Procedures",
    subProcedures: [
      "Gastric Bypass Revision or Conversion",
      "Band Removal with Sleeve/Bypass Conversion",
      "Hiatal Hernia Repair (concurrent)",
    ],
  },
  {
    name: "Endoscopic Procedures",
    subProcedures: [
      "Intragastric Balloon Placement",
      "Endoscopic Sleeve Gastroplasty (ESG)",
    ],
  },
]

export default function BariatricSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Bariatric Surgery',
    description: 'Effective weight-loss solutions for obesity',
    medicalSpecialty: 'Bariatric Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Bariatric (Weight-Loss) Surgery"
        description="Life-changing weight loss surgery options tailored to your needs, helping you achieve sustainable health and wellness."
        procedures={procedures}
      />
    </>
  )
}
