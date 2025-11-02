"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState, Suspense } from "react"
import { AuthButtons } from "./auth-buttons"
import Link from "next/link"
import { Route } from "next"

interface MobileNavProps {
  navLinks: Array<{ href: string; label: string }>
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 mt-8">
          {/* Mobile nav links */}
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as Route<string>}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA button in mobile menu */}
          <div className="w-full mt-4">
            <Suspense fallback={<Button className="w-full" disabled>Loading...</Button>}>
              <AuthButtons />
            </Suspense>
          </div>

          {/* Auth links/buttons wrapped in Suspense */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
