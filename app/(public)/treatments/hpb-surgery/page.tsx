import { TreatmentList } from "../_components/treatment-list"

const procedures = [
  "Hepatectomy (Liver Resection)",
  "Whipple Procedure (Pancreaticoduodenectomy)",
  "Distal Pancreatectomy",
  "Cholecystectomy (Laparoscopic and Open)",
  "Bile Duct Exploration and Reconstruction",
  "Surgery for Portal Hypertension (Shunt Procedures)",
  "Radiofrequency Ablation (RFA) of Liver Tumors",
  "Surgery for Chronic Pancreatitis (Frey, Puestow procedures)",
  "Resection of Cholangiocarcinoma (Klatskin Tumor)",
]

export default function HPBSurgeryPage() {
  return (
    <TreatmentList
      title="HPB (Hepatopancreatobiliary) Surgery"
      description="Complex surgical procedures for diseases of the liver, pancreas, gallbladder, and bile ducts, performed by highly specialized surgeons."
      procedures={procedures}
    />
  )
}
