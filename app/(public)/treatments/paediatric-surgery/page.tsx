import { TreatmentList } from "../_components/treatment-list"

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
  return (
    <TreatmentList
      title="Paediatric Surgery"
      description="Specialized and compassionate surgical care for infants, children, and adolescents, addressing congenital and acquired conditions."
      procedures={procedures}
    />
  )
}
