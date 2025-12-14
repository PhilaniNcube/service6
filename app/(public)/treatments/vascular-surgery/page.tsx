import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Endovascular Aneurysm Repair (EVAR/TEVAR)",
  "Open Abdominal Aortic Aneurysm (AAA) Repair",
  "Carotid Endarterectomy",
  "Peripheral Artery Bypass (Femoral-Popliteal, Aortobifemoral)",
  "Angioplasty and Stenting (Peripheral)",
  "Embolectomy / Thrombectomy",
  "Varicose Vein Ablation (Laser, Radiofrequency)",
  "Sclerotherapy",
  "AV Fistula Creation for Dialysis Access",
  "Surgery for Deep Vein Thrombosis (DVT)",
  "Sympathectomy (for Hyperhidrosis or CRPS)",
]

export default function VascularSurgeryPage() {
  return (
    <TreatmentList
      title="Vascular Surgery"
      description="Advanced vascular treatments for conditions affecting your arteries, veins, and lymphatic system, improving circulation and vascular health."
      procedures={procedures}
    />
  )
}
