import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Hemicolectomy (Right/Left)",
  "Anterior Resection (for Rectal Cancer)",
  "Abdominoperineal Resection (APR)",
  "Low Anterior Resection (LAR) with TME",
  "Total Colectomy / Proctocolectomy",
  "Ileal Pouch-Anal Anastomosis (J-Pouch)",
  "Hemorrhoidectomy (Conventional, Stapled, Doppler-guided)",
  "Surgery for Anal Fistula (Fistulotomy, Seton Placement, LIFT Procedure)",
  "Rectopexy (for Rectal Prolapse)",
  "Stoma Formation (Colostomy, Ileostomy) and Reversal",
  "Polypectomy (Endoscopic and Surgical)",
  "Surgery for Diverticular Disease (Sigmoid Colectomy)",
  "Lateral Internal Sphincterotomy (for Anal Fissure)",
]

export default function ColorectalSurgeryPage() {
  return (
    <TreatmentList
      title="Colorectal Surgery"
      description="Specialized surgical care for conditions affecting the colon, rectum, and anus, including cancer, inflammatory bowel disease, and proctological conditions."
      procedures={procedures}
    />
  )
}
