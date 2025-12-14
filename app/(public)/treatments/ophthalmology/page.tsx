import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Phacoemulsification (Cataract Surgery) with Premium IOLs",
  "LASIK / PRK / SMILE (Refractive Surgery)",
  "Vitrectomy (for Retinal Detachment, Diabetic Retinopathy)",
  "Trabeculectomy / Glaucoma Drainage Devices",
  "Pterygium Excision with Graft",
  "Corneal Transplant (Penetrating / Endothelial)",
  "Strabismus (Squint) Surgery",
]

export default function OphthalmologyPage() {
  return (
    <TreatmentList
      title="Ophthalmology"
      description="Comprehensive eye care and vision correction services using advanced surgical techniques."
      procedures={procedures}
    />
  )
}
