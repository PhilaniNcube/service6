"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 123 456 7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your medical needs</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your condition and what treatment you're seeking..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Request Consultation
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
                    href="mailto:info@africaremedical.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    info@africaremedical.com
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

            <Card className="p-6 bg-card">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground mb-1">Visit Us</div>
                  <p className="text-sm text-muted-foreground">Cape Town, South Africa</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
