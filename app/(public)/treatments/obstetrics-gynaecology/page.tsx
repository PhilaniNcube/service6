import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Obstetrics & Gynaecology in South Africa - Women\'s Health Specialists | ApexMed',
  description: 'Expert obstetrics and gynaecology care. Hysterectomy, C-section, fibroid removal, endometriosis surgery, pelvic floor repair. Women\'s health specialists.',
  keywords: ['obstetrics South Africa', 'gynaecology', 'hysterectomy', 'C-section', 'fibroid removal', 'endometriosis surgery', 'women\'s health'],
  openGraph: {
    title: 'Obstetrics & Gynaecology | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/obstetrics-gynaecology',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/obstetrics-gynaecology',
  },
}

const procedures = [
  "Caesarian Section",
  "Hysterectomy (Total, Laparoscopic, Robotic)",
  "Myomectomy (Fibroid Removal)",
  "Surgery for Endometriosis",
  "Pelvic Floor Repair (for Prolapse)",
  "Ovarian Cystectomy",
  "Tubal Ligation / Reversal",
  "Cervical Cerclage",
  "C-Section (for medical indications)",
]

export default function ObstetricsGynaecologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Obstetrics & Gynaecology',
    description: 'Comprehensive women\'s health services',
    procedureType: procedures,
    medicalSpecialty: 'Obstetrics and Gynecology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Obstetrics & Gynaecology"
        description="Comprehensive women's health services focusing on reproductive health, pregnancy, and childbirth, delivered with care and expertise."
        procedures={procedures}
      />
    </>
  )
}
