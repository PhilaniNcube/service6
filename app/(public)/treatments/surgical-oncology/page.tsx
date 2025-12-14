import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Lumpectomy / Mastectomy (with Reconstruction options)",
  "Radical Prostatectomy",
  "Colectomy / Rectal Resection",
  "Gastrectomy",
  "Pancreatectomy (Whipple Procedure)",
  "Hepatectomy (Liver Resection)",
  "Cytoreductive Surgery with HIPEC (for peritoneal cancers)",
]

export default function SurgicalOncologyPage() {
  return (
    <TreatmentList
      title="Surgical Oncology"
      description="Multidisciplinary surgical cancer care tailored to each patient's specific needs and condition."
      procedures={procedures}
    />
  )
}
