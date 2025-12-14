import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Lobectomy / Pneumonectomy (for Lung Cancer)",
  "Video-Assisted Thoracic Surgery (VATS)",
  "Pleurectomy / Decortication",
  "Mediastinal Tumor Resection",
  "Surgery for Pectus Excavatum",
  "Endoscopic Thoracic Sympathectomy (ETS) for Hyperhidrosis",
]

export default function ThoracicSurgeryPage() {
  return (
    <TreatmentList
      title="Thoracic Surgery"
      description="Advanced surgical treatment for organs within the chest, including the lungs, esophagus, and chest wall."
      procedures={procedures}
    />
  )
}
