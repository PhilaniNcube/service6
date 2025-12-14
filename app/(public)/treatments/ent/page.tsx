import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Tonsillectomy / Adenoidectomy",
  "Functional Endoscopic Sinus Surgery (FESS)",
  "Septoplasty / Rhinoplasty",
  "Thyroidectomy / Parathyroidectomy",
  "Tympanoplasty / Mastoidectomy",
  "Stapedectomy",
  "Cochlear Implantation",
  "Laryngectomy / Pharyngectomy (for cancer)",
]

export default function ENTPage() {
  return (
    <TreatmentList
      title="ENT (Otolaryngology)"
      description="Expert diagnosis and treatment for disorders of the ear, nose, throat, head, and neck region."
      procedures={procedures}
    />
  )
}
