import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { MainNav } from "./main-nav"
import Link from "next/link"

import { Suspense } from "react"
import { AuthButtons } from "./auth-buttons"
import Image from "next/image"

export function Navigation() {
  const navLinks = [
    { href: "/treatments", label: "Treatments" },
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/meet-our-team", label: "Team" },
    { href: "/blog", label: "Blog" },
    { href: "/faqs", label: "FAQs" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <header className="container mx-auto px-4 py-5 sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.webp"
            alt="ApexMed"
            width={1128}
            height={405}
            className="w-36 object-cover" 
          />
        </Link> 

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <MainNav />
          <Suspense fallback={<Button size="sm" disabled>Loading...</Button>}>
            <AuthButtons />
          </Suspense>
        </div>

        {/* Mobile Navigation */}
        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  )
}
