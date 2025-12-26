import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Colorectal Surgery in South Africa - Colon & Rectal Specialists | ApexMed',
  description: 'Expert colorectal surgery. Colon cancer surgery, rectal cancer treatment, hemorrhoidectomy, fistula surgery, IBD surgery. Specialized colorectal surgeons.',
  keywords: ['colorectal surgery South Africa', 'colon cancer surgery', 'rectal cancer', 'hemorrhoids treatment', 'fistula surgery', 'IBD surgery', 'stoma surgery'],
  openGraph: {
    title: 'Colorectal Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/colorectal-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/colorectal-surgery',
  },
}

const procedures = [
  "Hemicolectomy (Right/Left)",
  "Anterior Resection (for Rectal Cancer)",
  "Abdominoperineal Resection (APR)",
  "Low Anterior Resection (LAR) with TME",
  "Total Colectomy / Proctocolectomy",
  "Ileal Pouch-Anal Anastomosis (J-Pouch)",
  "Hemorrhoidectomy (Conventional, Stapled, Doppler-guided)",
  "Surgery for Anal Fistula (Fistulotomy, Seton Placement, LIFT Procedure)",
  "Rectopexy (for Rectal Prolapse)",
  "Stoma Formation (Colostomy, Ileostomy) and Reversal",
  "Polypectomy (Endoscopic and Surgical)",
  "Surgery for Diverticular Disease (Sigmoid Colectomy)",
  "Lateral Internal Sphincterotomy (for Anal Fissure)",
]

export default function ColorectalSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Colorectal Surgery',
    description: 'Specialized surgical care for colon, rectum, and anus conditions',
    procedureType: procedures,
    medicalSpecialty: 'Colorectal Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Colorectal Surgery"
        description="Specialized surgical care for conditions affecting the colon, rectum, and anus, including cancer, inflammatory bowel disease, and proctological conditions."
        procedures={procedures}
      />
    </>
  )
}
