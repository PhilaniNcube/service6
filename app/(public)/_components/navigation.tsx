import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { MainNav } from "./main-nav"
import Link from "next/link"
import { Route } from "next"
import { Suspense } from "react"
import { AuthButtons } from "./auth-buttons"

export function Navigation() {
  const navLinks = [
    { href: "/treatments", label: "Treatments" },
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary to-accent">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-foreground">Services6 Medical</span>
        </div>

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
    </nav>
  )
}
