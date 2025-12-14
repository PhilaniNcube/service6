import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Breast Augmentation (Implants)",
  "Breast Reduction",
  "Mastopexy (Breast Lift)",
  "Abdominoplasty (Tummy Tuck)",
  "Rhinoplasty",
  "Blepharoplasty (Eyelid Surgery)",
  "Rhytidectomy (Facelift)",
  "Liposuction & Body Contouring",
  "Brachioplasty (Arm Lift)",
  "Post-Bariatric Body Lifting",
  "Gynecomastia Surgery",
  "BBL (Brazilian Butt Lift)",
]

export default function CosmeticSurgeryPage() {
  return (
    <TreatmentList
      title="Cosmetic & Plastic Surgery"
      description="Enhance your natural beauty and boost your confidence with our comprehensive range of cosmetic and reconstructive procedures performed by world-class plastic surgeons."
      procedures={procedures}
    />
  )
}
