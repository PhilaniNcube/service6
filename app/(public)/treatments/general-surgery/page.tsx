import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Laparoscopic Cholecystectomy (Gallbladder)",
  "Laparoscopic Appendectomy",
  "Hernia Repair (Inguinal, Umbilical, Hiatal)",
  "Gastric Sleeve / Gastric Bypass (Bariatric)",
  "Hemicolectomy (Colon Resection)",
  "Hemorrhoidectomy",
  "Thyroidectomy / Parathyroidectomy",
  "Splenectomy",
]

export default function GeneralSurgeryPage() {
  return (
    <TreatmentList
      title="General Surgery"
      description="Comprehensive general surgical services focusing on the abdominal contents, including esophagus, stomach, small lung, colon, liver, pancreas, gallbladder requiring surgery."
      procedures={procedures}
    />
  )
}
