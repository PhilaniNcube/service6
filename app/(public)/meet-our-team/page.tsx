
import React from 'react';
import Image from 'next/image';

export default function MeetOurTeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-10">
            ApexMed, excellence in healthcare delivery is shaped by the leadership of its core team.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            
            {/* Dr Paul M Wondoh */}
            <div className="flex flex-col gap-8">
              <div className="flex-col rounded-2xl flex items-center justify-center text-muted-foreground">
                <Image 
                  src="/Paul.jpeg"
                  alt="Dr Paul M Wondoh"
                  width={400}
                  height={500}
                  className="w-1/2 aspect-square object-top object-cover rounded-2xl"
                />
                <span className="text-lg font-medium">Photo: Dr. Paul M Wondoh</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Dr Paul M Wondoh</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Dr. Paul Mwindekuma Wondoh is the Founder and one of the Directors of ApexMed, a premier medical tourism company committed to connecting patients with world-class healthcare in South Africa and across the region. A Specialist General Surgeon with over a decade of clinical experience, Dr. Wondoh holds both the Fellowship of the College of Surgeons of South Africa (FCS SA) and a Master of Medicine in Surgery (MMed)—qualifications that anchor his leadership in clinical excellence and professional integrity.
                  </p>
                  <p>
                    With more than 10 years of hands-on surgical practice, Dr. Wondoh has earned a reputation for meticulous technique, clear decision-making, and compassionate patient care. His extensive clinical background empowers ApexMed to deliver safe, reliable, and informed medical travel experiences—ensuring that every patient receives exceptional, evidence-based care.
                  </p>
                  <p>
                    As the visionary behind ApexMed, Dr. Wondoh founded the company with a singular mission: to make high-quality, specialist healthcare accessible to international patients through seamless, well-coordinated medical tourism services. His leadership blends medical expertise with strategic insight, building a system where patient comfort, safety, and satisfaction come first.
                  </p>
                  <p>
                    Under his direction, ApexMed continues to rise as a trusted bridge between patients and top-tier medical care, offering a world-class experience that prioritizes excellence, compassion, and patient-centered outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Dr Rogers Byebwa */}
            <div className="flex flex-col gap-8">
              <div className="flex-col rounded-2xl flex items-center justify-center text-muted-foreground">
                 <Image  
                  src="/Rodgers.jpeg"
                  alt="Dr Rogers Byebwa"
                  width={400}
                  height={500}
                  className="w-1/2 aspect-square object-top object-cover rounded-2xl"
                 />
                 <span className="text-lg font-medium">Photo: Dr. Rogers Byebwa</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Dr Rogers Byebwa</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Dr. Rogers Byebwa is a Specialist General Surgeon and innovative healthcare entrepreneur whose career spans multiple countries, including several years of clinical practice in Canada. He holds the Fellowship of the College of Surgeons of South Africa (FCS SA) and a Master of Medicine in Surgery (MMed), reflecting his high level of specialist training and commitment to clinical excellence.
                  </p>
                  <p>
                     Dr. Byebwa’s surgical expertise is strengthened by his international experience, having worked within advanced healthcare systems in Canada where he gained exposure to modern surgical protocols, efficient patient-care models, and high-performance clinical environments. This global perspective greatly enhances his approach to patient management and healthcare innovation.
                  </p>
                  <p>
                    Beyond his surgical accomplishments, Dr. Byebwa is a seasoned business creator and strategist, with a strong track record of developing and guiding healthcare ventures. His work focuses on expanding access to specialist care, building sustainable service models, and integrating innovation into healthcare delivery.
                  </p>
                  <p>
                    As a Director of ApexMed, Dr. Byebwa combines international clinical experience, entrepreneurial insight, and strategic leadership to drive the company’s growth. His vision contributes significantly to ApexMed’s mission of providing trusted, high-quality, patient-centered medical services across the region.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
