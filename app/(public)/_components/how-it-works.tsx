import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "Share your medical needs and we'll assess the best treatment options in South Africa.",
    linear: "from-orange-500 to-red-500",
  },
  {
    number: "02",
    title: "Specialist Matching",
    description: "We connect you with the right medical specialists and facilities for your condition.",
    linear: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Travel Planning",
    description: "Complete travel arrangements including flights, accommodation, and documentation.",
    linear: "from-purple-500 to-pink-500",
  },
  {
    number: "04",
    title: "Treatment & Care",
    description: "Receive world-class medical care with our support throughout your stay.",
    linear: "from-green-500 to-emerald-500",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-linear-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Your Journey to Better Health
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A simple, streamlined process from consultation to recovery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                <div
                  className={`text-5xl font-bold bg-linear-to-br ${step.linear} bg-clip-text text-transparent mb-4`}
                >
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-linear-to-r from-muted to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
