import { Button } from "@/components/ui/button"
import { ArrowRight, Plane, MapPin } from "lucide-react"
import Image from "next/image"

export function TouristTravel() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
            <Plane className="h-4 w-4" />
            Beyond Medical Care
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance mb-6">
            Explore South Africa
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Enhance your medical journey with unforgettable experiences. We facilitate travel to South Africa's most iconic destinations.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            
          {/* Destination 1: Kruger National Park */}
          <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
             <div className="relative aspect-video overflow-hidden">
                <Image 
                    src="/images/kruger.webp" 
                    alt="Kruger National Park Safari" 
                  fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-orange-400" />
                        <span className="font-medium text-orange-100">Mpumalanga & Limpopo</span>
                    </div>
                    <h3 className="text-2xl font-bold">Kruger National Park</h3>
                </div>
             </div>
             <div className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    Experience the ultimate African safari. Witness the Big Five in their natural habitat and enjoy luxury game lodges just a short flight from major medical centers. Make your recovery a memorable adventure.
                </p>
               
             </div>
          </div>

          {/* Destination 2: Cape Town */}
          <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
             <div className="relative aspect-video overflow-hidden">
                <Image   
                    src="/images/cape_town.jpg" 
                    alt="Cape Town and Table Mountain" 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-blue-400" />
                        <span className="font-medium text-blue-100">Western Cape</span>
                    </div>
                    <h3 className="text-2xl font-bold">Cape Town</h3>
                </div>
             </div>
             <div className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    Discover the Mother City. From the iconic Table Mountain to the vibrant V&A Waterfront and world-class winelands, Cape Town offers the perfect blend of relaxation and culture for your stay.
                </p>
              
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
