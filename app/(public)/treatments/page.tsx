import type { Metadata } from 'next'
import Link from "next/link"
import { 
  Sparkles, 
  Bone, 
  Stethoscope, 
  Scale, 
  Activity, 
  CircleDot, 
  Brain, 
  Baby, 
  Ear, 
  Eye, 
  Smile, 
  Heart, 
  Wind, 
  Scissors
} from "lucide-react"
import { Route } from "next"

export const metadata: Metadata = {
  title: 'Medical Treatments & Specialties - Comprehensive Healthcare Services | ApexMed',
  description: 'Explore our comprehensive range of medical specialties including cosmetic surgery, orthopedics, cardiac care, neurosurgery, ophthalmology, dental, and more. World-class specialists in South Africa.',
  keywords: [
    'medical treatments South Africa',
    'surgical specialties',
    'cosmetic surgery',
    'orthopedic surgery',
    'cardiac surgery',
    'neurosurgery',
    'ophthalmology',
    'dental surgery',
    'bariatric surgery',
    'general surgery',
    'medical specialties',
  ],
  openGraph: {
    title: 'Medical Treatments & Specialties | ApexMed',
    description: 'Comprehensive range of medical specialties with world-class specialists in South Africa.',
    url: 'https://www.apexmedsa.co.za/treatments',
    siteName: 'ApexMed',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.apexmedsa.co.za/treatments',
  },
}

const categories = [
  {
    title: "Cosmetic & Plastic Surgery",
    description: "Enhance your appearance with our comprehensive range of cosmetic and reconstructive procedures.",
    icon: Sparkles,
    href: "/treatments/cosmetic-plastic-surgery",
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    title: "Bariatric Surgery",
    description: "Effective weight-loss solutions including gastric sleeve, bypass, and non-surgical options.",
    icon: Scale,
    href: "/treatments/bariatric-surgery",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Orthopaedics",
    description: "Expert care for joints, bones, ligaments, and tendons, including joint replacements.",
    icon: Bone,
    href: "/treatments/orthopaedics",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Dental & Maxillofacial",
    description: "Advanced dental treatments, implants, and reconstructive jaw surgery.",
    icon: Smile,
    href: "/treatments/dental-maxillofacial",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    title: "Ophthalmology",
    description: "Vision correction, cataract surgery, and treatments for retinal conditions.",
    icon: Eye,
    href: "/treatments/ophthalmology",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Cardiac Surgery",
    description: "World-class heart surgery including bypass, valve repair, and minimally invasive procedures.",
    icon: Heart,
    href: "/treatments/cardiac-surgery",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "Neurosurgery",
    description: "Advanced surgical treatments for brain, spine, and nervous system conditions.",
    icon: Brain,
    href: "/treatments/neurosurgery",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
  },
  {
    title: "Obstetrics & Gynaecology",
    description: "Comprehensive women's health services, maternity care, and gynecological surgery.",
    icon: Baby,
    href: "/treatments/obstetrics-gynaecology",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Urology",
    description: "Treatment for urinary tract conditions, men's health, and kidney stones.",
    icon: Activity,
    href: "/treatments/urology",
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
  },
  {
    title: "ENT (Otolaryngology)",
    description: "Specialized care for ear, nose, and throat conditions.",
    icon: Ear,
    href: "/treatments/ent",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "General Surgery",
    description: "Minimally invasive and traditional surgery for abdominal and digestive conditions.",
    icon: Scissors,
    href: "/treatments/general-surgery",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Vascular Surgery",
    description: "Treatment for conditions affecting arteries and veins, including varicose veins.",
    icon: Activity,
    href: "/treatments/vascular-surgery",
    color: "text-red-400",
    bgColor: "bg-red-50",
  },
  {
    title: "Colorectal Surgery",
    description: "Diagnosis and surgical treatment of colon, rectal, and anal conditions.",
    icon: CircleDot,
    href: "/treatments/colorectal-surgery",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "HPB Surgery",
    description: "Specialized surgery for the liver, pancreas, and biliary system.",
    icon: Activity,
    href: "/treatments/hpb-surgery",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Surgical Oncology",
    description: "Cancer surgery including tumor removal and reconstructive options.",
    icon: Sparkles, // Placeholder for Oncology
    href: "/treatments/surgical-oncology",
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-50",
  },
  {
    title: "Thoracic Surgery",
    description: "Surgery for conditions of the lung, chest wall, and mediastinum.",
    icon: Wind,
    href: "/treatments/thoracic-surgery",
    color: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    title: "Paediatric Surgery",
    description: "Specialized surgical care for infants, children, and adolescents.",
    icon: Baby,
    href: "/treatments/paediatric-surgery",
    color: "text-lime-500",
    bgColor: "bg-lime-50",
  },
]

export default function TreatmentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'ApexMed',
    description: 'Comprehensive medical treatments and specialties in South Africa',
    url: 'https://www.apexmedsa.co.za/treatments',
    medicalSpecialty: categories.map((cat) => cat.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Specialties',
      itemListElement: categories.map((cat, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: cat.title,
          description: cat.description,
        },
        position: index + 1,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-6">
            World-Class Medical Treatments
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-10">
            Explore our comprehensive range of specialized medical procedures performed by leading experts in world-class facilities.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href as Route}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 block"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor} mb-4`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <div className={`h-8 w-8 rounded-full ${category.bgColor} flex items-center justify-center`}>
                    <Activity className={`h-4 w-4 ${category.color}`} /> 
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
