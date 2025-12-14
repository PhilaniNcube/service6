import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Robotic-Assisted Laparoscopic Prostatectomy (RALP)",
  "Radical Nephrectomy / Partial Nephrectomy",
  "Cystectomy (for Bladder Cancer)",
  "TURP / HoLEP / Laser Enucleation (for BPH)",
  "Percutaneous Nephrolithotomy (PCNL) for Kidney Stones",
  "Ureteroscopy with Laser Lithotripsy",
  "Penile Implant (Prosthesis) Surgery",
  "Vasectomy / Vasectomy Reversal",
]

export default function UrologyPage() {
  return (
    <TreatmentList
      title="Urology"
      description="State-of-the-art urological care for men and women, treating conditions of the kidney, bladder, and reproductive system."
      procedures={procedures}
    />
  )
}
