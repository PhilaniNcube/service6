"use client"

import type React from "react"

import { useActionState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone } from "lucide-react"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { sendContactEmail } from "@/dal/actions"
import { toast } from "sonner"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactEmail, {
    success: false,
    message: "",
  })

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
      reset()
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state, reset])

  return (
    <section className="pb-16 bg-muted/30" id="contact">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
            Start Your Healthcare Journey Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Get in touch for a free consultation and personalized treatment plan
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card">
              <form action={formAction} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field data-invalid={!!errors.name || !!state.errors?.name}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      {...register("name")}
                      disabled={pending}
                    />
                    <FieldError>
                      {errors.name?.message || state.errors?.name?.[0]}
                    </FieldError>
                  </Field>

                  <Field data-invalid={!!errors.email || !!state.errors?.email}>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      disabled={pending}
                    />
                    <FieldError>
                      {errors.email?.message || state.errors?.email?.[0]}
                    </FieldError>
                  </Field>
                </div>

                <Field data-invalid={!!errors.phone || !!state.errors?.phone}>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+27 123 456 789"
                    {...register("phone")}
                    disabled={pending}
                  />
                  <FieldError>
                    {errors.phone?.message || state.errors?.phone?.[0]}
                  </FieldError>
                </Field>

                <Field data-invalid={!!errors.message || !!state.errors?.message}>
                  <FieldLabel htmlFor="message">
                    Tell us about your medical needs
                  </FieldLabel>
                  <Textarea
                    id="message"
                    placeholder="Please describe your condition and what treatment you're seeking..."
                    rows={6}
                    {...register("message")}
                    disabled={pending}
                  />
                  <FieldError>
                    {errors.message?.message || state.errors?.message?.[0]}
                  </FieldError>
                </Field>

                <Button type="submit" size="lg" className="w-full" disabled={pending}>
                  {pending ? "Sending..." : "Request Consultation"}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground mb-1">Email Us</div>
                  <a
                    href="mailto:info@apexmedsa.co.za"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@apexmedsa.co.za
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground mb-1">Call Us</div>
                  <a
                    href="tel:+27123456789"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +27 12 345 6789
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
