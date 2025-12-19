import { Card } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Medical Professional Led",
    description:
      "Founded and operated by experienced healthcare professionals who understand your needs.",
  },
  {
    icon: Award,
    title: "Accredited Partners",
    description:
      "We work exclusively with internationally accredited hospitals and certified specialists.",
  },
  {
    icon: Users,
    title: "Personalized Care",
    description:
      "Dedicated care coordinator assigned to guide you through every step of your journey.",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description:
      "Quick turnaround on appointments, documentation, and travel arrangements.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance mb-6">
              Why Choose ApexMed?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty">
              We bridge the gap between African patients and South Africa&apos;s
              world-class healthcare system. Our mission is to make quality
              medical care accessible, affordable, and stress-free.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-3/4 overflow-hidden rounded-2xl bg-muted">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/african-medical-professional-with-patient-in-moder-TPytLHIRrarQ44zzO1noI2MtOdmvYt.jpg"
                alt="Medical professional consultation"
                className="h-full w-full object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 -left-6 p-6 bg-card shadow-lg">
              
              <div className="text-sm text-muted-foreground">
                Compassion and Care
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
