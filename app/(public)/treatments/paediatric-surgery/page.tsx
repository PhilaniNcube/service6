import type { Metadata } from 'next'
import { TreatmentList } from "../_components/treatment-list"

export const metadata: Metadata = {
  title: 'Paediatric Surgery in South Africa - Children\'s Surgery Specialists | ApexMed',
  description: 'Expert paediatric surgery for infants, children, and adolescents. Congenital defect repair, appendectomy, hernia repair. Specialized children\'s surgical care.',
  keywords: ['paediatric surgery South Africa', 'children\'s surgery', 'congenital defects', 'pediatric hernia repair', 'infant surgery', 'child surgery'],
  openGraph: {
    title: 'Paediatric Surgery | ApexMed',
    url: 'https://www.apexmedsa.co.za/treatments/paediatric-surgery',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments/paediatric-surgery',
  },
}

const procedures = [
  "Congenital Hernia Repair (Inguinal, Umbilical)",
  "Orchidopexy (for Undescended Testis)",
  "Pyloromyotomy (for Pyloric Stenosis)",
  "Appendectomy (Paediatric)",
  "Fundoplication (for Severe GERD)",
  "Pull-Through Procedure (for Hirschsprung's Disease)",
  "Repair of Tracheo-Oesophageal Fistula (TOF)",
  "Repair of Congenital Diaphragmatic Hernia",
  "Repair of Omphalocele / Gastroschisis",
  "Paediatric Cholecystectomy (Gallbladder)",
  "Splenectomy (Paediatric)",
  "Resection of Neuroblastoma / Wilms’ Tumor",
  "Kasai Procedure (for Biliary Atresia)",
  "Bowel Atresia Repair",
  "Anorectal Malformation Repair",
  "Paediatric Thoracoscopy / Lung Resection (Congenital Lung Lesions)",
  "Congenital Heart Defect Repair (coordinated with paediatric cardiac surgery)",
  "Paediatric Urology Procedures (e.g., Hypospadias Repair, Pyeloplasty for UPJ Obstruction)",
  "Insertion of Central Venous Access Devices (e.g., Port-a-Cath)",
  "Paediatric Endoscopic Procedures",
]

export default function PaediatricSurgeryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Paediatric Surgery',
    description: 'Specialized surgical care for infants, children, and adolescents',
    procedureType: procedures,
    medicalSpecialty: 'Pediatric Surgery',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TreatmentList
        title="Paediatric Surgery"
        description="Specialized and compassionate surgical care for infants, children, and adolescents, addressing congenital and acquired conditions."
        procedures={procedures}
      />
    </>
  )
}
