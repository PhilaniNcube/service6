import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Craniotomy for Tumor Resection",
  "Pituitary Tumor Surgery (Transsphenoidal)",
  "Cerebral Aneurysm Clipping / Coiling",
  "Deep Brain Stimulation (DBS) Implantation",
  "Microdiscectomy / Laminectomy",
  "Spinal Fusion",
  "Carpal Tunnel Release (Endoscopic)",
  "Chiari Decompression",
]

export default function NeurosurgeryPage() {
  return (
    <TreatmentList
      title="Neurosurgery"
      description="Advanced surgical interventions for specific disorders of the brain, spinal cord, spinal column, and peripheral nerves throughout all parts of the body."
      procedures={procedures}
    />
  )
}
