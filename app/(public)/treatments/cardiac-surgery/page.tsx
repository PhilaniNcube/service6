import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Coronary Artery Bypass Grafting (CABG)",
  "Aortic / Mitral Valve Repair or Replacement",
  "Transcatheter Aortic Valve Implantation (TAVI)",
  "Atrial Septal Defect (ASD) / Ventricular Septal Defect (VSD) Closure",
  "Aortic Aneurysm Repair (Open or Endovascular)",
  "Maze Procedure (for Atrial Fibrillation)",
]

export default function CardiacSurgeryPage() {
  return (
    <TreatmentList
      title="Cardiac Surgery"
      description="World-class cardiac surgical care featuring the latest techniques in heart valve repair and bypass surgery."
      procedures={procedures}
    />
  )
}
