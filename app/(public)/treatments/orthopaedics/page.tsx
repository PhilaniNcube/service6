import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Total Hip Replacement",
  "Total Knee Replacement",
  "Shoulder Replacement",
  "Arthroscopic ACL Reconstruction",
  "Arthroscopic Meniscus Repair",
  "Rotator Cuff Repair",
  "Spinal Fusion (Lumbar/Cervical)",
  "Laminectomy / Discectomy",
  "Carpal Tunnel Release",
  "Complex Fracture Fixation",
]

export default function OrthopaedicsPage() {
  return (
    <TreatmentList
      title="Orthopaedic Surgery"
      description="Restore mobility and live pain-free with expert orthopaedic care, from joint replacements to sports medicine and spinal surgery."
      procedures={procedures}
    />
  )
}
