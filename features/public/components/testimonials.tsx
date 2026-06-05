"use client"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, Quote, MessageSquare } from "lucide-react"

const testimonials = [
  {
    quote: "ApexMedSa made my medical journey completely stress-free. From my first consultation to my return home, everything was handled professionally.",
    author: "Sarah M.",
    country: "United Kingdom",
    flag: "🇬🇧",
    initials: "SM",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    quote: "The level of care and attention I received was outstanding. ApexMedSa connected me with an excellent surgeon and coordinated every detail.",
    author: "David K.",
    country: "Botswana",
    flag: "🇧🇼",
    initials: "DK",
    gradient: "from-orange-500 to-red-600",
  },
  {
    quote: "I was impressed by how smooth the entire process was. The team was responsive, caring, and highly organized.",
    author: "Linda A.",
    country: "Namibia",
    flag: "🇳🇦",
    initials: "LA",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    quote: "Traveling for surgery can be overwhelming, but ApexMedSa made it easy. I felt supported every step of the way.",
    author: "Michael T.",
    country: "Zambia",
    flag: "🇿🇲",
    initials: "MT",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    quote: "The quality of treatment exceeded my expectations. I highly recommend ApexMedSa to anyone seeking medical care in South Africa.",
    author: "Grace N.",
    country: "Kenya",
    flag: "🇰🇪",
    initials: "GN",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    quote: "From airport pickup to post-operative follow-up, everything was professionally arranged. An exceptional experience.",
    author: "Kwame O.",
    country: "Ghana",
    flag: "🇬🇭",
    initials: "KO",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    quote: "ApexMed helped me find the right specialist quickly. The service was efficient, transparent, and patient-centered.",
    author: "Amina B.",
    country: "Tanzania",
    flag: "🇹🇿",
    initials: "AB",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    quote: "The team went above and beyond to ensure my comfort and peace of mind. I couldn't have asked for a better experience.",
    author: "Fatima H.",
    country: "Nigeria",
    flag: "🇳🇬",
    initials: "FH",
    gradient: "from-indigo-500 to-purple-600",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Section Header with Carousel Navigation integrated cleanly */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">

              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
                What Our Patients Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Real feedback from patients who trusted ApexMed with their healthcare journey.
              </p>
            </div>

            {/* Premium navigation placement */}
            <div className="flex gap-3 mt-8 md:mt-0">
              <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all duration-300" />
              <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 shadow-sm transition-all duration-300" />
            </div>
          </div>

          {/* Testimonial Cards Slider */}
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-full flex flex-col justify-between p-8 bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200/80 transition-all duration-300 rounded-2xl relative overflow-hidden group">
                  {/* Quote icon background decoration */}
                  <div className="absolute -top-4 -right-4 text-slate-100/70 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:text-slate-150">
                    <Quote className="h-28 w-28 rotate-180" />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <blockquote className="flex-1 text-slate-700 text-base leading-relaxed italic mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Author Meta */}
                  <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-100">
                    {/* Beautiful Avatar using Initials Gradient */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} text-white font-semibold text-sm shadow-inner`}
                    >
                      {item.initials}
                    </div>

                    <div>
                      <div className="font-semibold text-slate-900 text-sm md:text-base">
                        {item.author}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 mt-0.5">
                        <span>{item.flag}</span>
                        <span>{item.country}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}
