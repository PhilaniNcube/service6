import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-medium text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Trusted Medical Tourism Partner
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              World-Class Healthcare in South Africa
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl text-pretty">
              Access premium medical care with seamless travel coordination. We
              handle everything from specialist appointments to accommodation,
              so you can focus on your health.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="gap-2">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 overflow-hidden rounded-2xl bg-muted">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-hospital-in-south-africa-with-medical-profe-YW7jqqb3RSXWbBnMMQ5tQBLoPGrWfk.jpg"
                alt="Modern healthcare facility"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-linear-to-br from-white to-blue-50 p-6 shadow-lg border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-secondary to-primary">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-card-foreground">
                    Professional Care
                  </div>
                  <div className="text-xs text-muted-foreground">
                    End-to-end support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
