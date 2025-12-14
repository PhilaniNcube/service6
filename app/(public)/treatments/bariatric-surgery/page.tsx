import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  {
    name: "Restrictive Procedures",
    subProcedures: [
      "Laparoscopic Sleeve Gastrectomy",
      "Adjustable Gastric Banding (Lap-Band)",
    ],
  },
  {
    name: "Malabsorptive/Restrictive Procedures",
    subProcedures: [
      "Roux-en-Y Gastric Bypass",
      "One-Anastomosis Gastric Bypass (Mini Gastric Bypass)",
    ],
  },
  {
    name: "Revision/Secondary Procedures",
    subProcedures: [
      "Gastric Bypass Revision or Conversion",
      "Band Removal with Sleeve/Bypass Conversion",
      "Hiatal Hernia Repair (concurrent)",
    ],
  },
  {
    name: "Endoscopic Procedures",
    subProcedures: [
      "Intragastric Balloon Placement",
      "Endoscopic Sleeve Gastroplasty (ESG)",
    ],
  },
]

export default function BariatricSurgeryPage() {
  return (
    <TreatmentList
      title="Bariatric (Weight-Loss) Surgery"
      description="Life-changing weight loss surgery options tailored to your needs, helping you achieve sustainable health and wellness."
      procedures={procedures}
    />
  )
}
