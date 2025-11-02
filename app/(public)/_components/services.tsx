import { Card } from "@/components/ui/card"
import { Plane, Calendar, FileText, Stethoscope, Home, HeadphonesIcon } from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "Specialist Coordination",
    description: "Connect with top medical specialists across South Africa for consultations and treatments.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: Plane,
    title: "Travel Arrangements",
    description: "Complete flight booking, visa assistance, and airport transfers for a stress-free journey.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "We coordinate all medical appointments, tests, and follow-ups on your behalf.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: FileText,
    title: "Documentation Support",
    description: "Assistance with medical records, insurance claims, and all necessary paperwork.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Home,
    title: "Accommodation",
    description: "Comfortable lodging near medical facilities with options for family members.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock assistance throughout your medical journey in South Africa.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Comprehensive Medical Tourism Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need for a seamless healthcare experience abroad
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`p-6 hover:shadow-xl transition-all hover:-translate-y-1 ${service.bgColor} border-none`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br ${service.color} mb-4`}
              >
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
