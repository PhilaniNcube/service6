import { TreatmentList } from "../_components/treatment-list"

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
  return (
    <TreatmentList
      title="Obstetrics & Gynaecology"
      description="Comprehensive women's health services focusing on reproductive health, pregnancy, and childbirth, delivered with care and expertise."
      procedures={procedures}
    />
  )
}
