import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs - ApexMed Medical Tourism | Your Questions Answered",
  description:
    "Find answers to frequently asked questions about ApexMed's medical tourism services, including travel arrangements, specialist coordination, and 24/7 support in South Africa.",
  keywords: [
    "medical tourism FAQ",
    "ApexMed questions",
    "South Africa healthcare",
    "medical travel support",
    "international patient care",
    "medical tourism process",
  ],
  openGraph: {
    title: "FAQs - ApexMed Medical Tourism",
    description:
      "Get answers to all your questions about medical tourism with ApexMed. Learn about our process, services, and support.",
    type: "website",
    url: "https://apexmedsa.co.za/faqs",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs - ApexMed Medical Tourism",
    description:
      "Get answers to all your questions about medical tourism with ApexMed. Learn about our process, services, and support.",
  },
  alternates: {
    canonical: "https://apexmedsa.co.za/faqs",
  },
};

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqData: FAQItem[] = [
  {
    question: "What is ApexMed?",
    answer:
      "ApexMed is a medical tourism facilitator based in South Africa that helps international patients access world-class healthcare while organizing travel, accommodation, and full logistical support from start to finish.",
  },
  {
    question: "What services does ApexMed provide?",
    answer: [
      "We provide end-to-end support for your medical journey, including:",
      "• Specialist coordination and treatment matching",
      "• Travel arrangements, including flights and visas",
      "• Appointment scheduling with doctors and hospitals",
      "• Comfortable accommodation close to treatment facilities",
      "• 24/7 support throughout your stay in South Africa.",
    ],
  },
  {
    question: "How does your process work?",
    answer: [
      "Our streamlined process includes:",
      "1. Free initial consultation to understand your medical needs",
      "2. Matching with appropriate specialists and healthcare facilities",
      "3. Travel planning, including visas, flights, and hotels",
      "4. Treatment coordination and ongoing support throughout your care journey",
      "5. Follow up after treatment in home country",
    ],
  },
  {
    question: "Do you provide medical treatment directly?",
    answer:
      "No. Although the core team is made up of highly trained medical doctors, ApexMed does not provide medical procedures directly — instead, we connect you with top-rated South African specialists and internationally accredited hospitals to deliver your care.",
  },
  {
    question: "Can ApexMed help with visas and travel documents?",
    answer:
      "Yes! We assist with travel documentation, visa guidance, and itinerary arrangements to ensure a smooth journey to South Africa.",
  },
  {
    question: "Is travel and accommodation included?",
    answer:
      "Yes — we coordinate your flight bookings, airport transfers, and comfortable lodging near your healthcare facilities, including options for accompanying family members.",
  },
  {
    question: "Do I get support once I arrive in South Africa?",
    answer:
      "Absolutely. ApexMed provides 24/7 support to clients during their entire stay — from arrival to discharge and departure.",
  },
  {
    question: "How do I start my medical journey with ApexMed?",
    answer:
      "Simply contact us for a free consultation via the form on our website, email (info@apexmedsa.co.za), or phone (+27 648 721 834). We'll assess your needs and guide you step by step.",
  },
  {
    question:
      "Which destinations in South Africa do you recommend for recovery and leisure?",
    answer: [
      "Beyond medical care, we can help you explore iconic South African destinations like:",
      "• Kruger National Park for luxurious safari experiences",
      "• God's Window, a dramatic cliff-top viewpoint",
      "• Sun City Resort with world class entertainment resources",
      "• Sudwala Caves, among the oldest caves in the world",
      "• Drakensberg Mountains with wellness lodges",
      "• Cape Town and the Winelands for culture and relaxation.",
    ],
  },
  {
    question: "Are the doctors and hospitals accredited?",
    answer:
      "Yes. We work with internationally accredited hospitals and certified specialists to ensure quality, safety, and top clinical care.",
  },
  {
    question: "What languages do you support?",
    answer:
      "While primary communication is in English, we can help facilitate interpretation support if needed.",
  },
];

export default function FAQsPage() {
  // Generate FAQ Schema for Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              Everything you need to know about ApexMed&apos;s medical tourism
              services in South Africa
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <Collapsible
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50">
                  <h2 className="pr-4 text-lg font-semibold md:text-xl">
                    {faq.question}
                  </h2>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6 pt-0">
                  <div className="border-t pt-4">
                    {Array.isArray(faq.answer) ? (
                      <div className="space-y-2 text-muted-foreground">
                        {faq.answer.map((line, lineIndex) => (
                          <p key={lineIndex} className="whitespace-pre-wrap">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{faq.answer}</p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 rounded-lg border bg-muted/50 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Still Have Questions?</h2>
            <p className="mb-6 text-muted-foreground">
              Our team is here to help you every step of the way.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Contact Us
              </Link>
              <a
                href="mailto:info@apexmedsa.co.za"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
