import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Route } from "next"

interface TreatmentListProps {
  title: string
  description?: string
  procedures: (string | { name: string; description?: string; subProcedures?: string[] })[]
  ctaText?: string
  ctaLink?: Route
}

export function TreatmentList({
  title,
  description,
  procedures,
  ctaText = "Book a Consultation",
  ctaLink = "/contact" as Route,
}: TreatmentListProps) {
  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{title}</h1>
          {description && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {procedures.map((procedure, index) => {
             const isString = typeof procedure === 'string';
             const name = isString ? procedure : procedure.name;
             const subProcedures = !isString ? procedure.subProcedures : undefined;

            return (
              <div
                key={index}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{name}</h3>
                    {/* Render sub-procedures if any */}
                    {subProcedures && subProcedures.length > 0 && (
                        <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc list-inside">
                            {subProcedures.map((sub, subIndex) => (
                                <li key={subIndex}>{sub}</li>
                            ))}
                        </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href={ctaLink}>
            <Button size="lg" className="h-12 px-8 text-lg rounded-full">
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
