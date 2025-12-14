import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Dental Implants (Single, All-on-4®)",
  "Orthognathic (Jaw Corrective) Surgery",
  "Bone Grafting",
  "Wisdom Tooth Extraction (Surgical)",
  "TMJ Disorder Surgery",
  "Facial Trauma Reconstruction",
  "Cleft Lip/Palate Repair",
]

export default function DentalMaxillofacialPage() {
  return (
    <TreatmentList
      title="Dental & Maxillofacial Surgery"
      description="Specialized facio-maxillary and dental surgical procedures to restore function and aesthetics."
      procedures={procedures}
    />
  )
}
