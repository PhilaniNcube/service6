"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Route } from "next"

const treatments: { title: string; href: string; description: string }[] = [
  {
    title: "Cosmetic & Plastic Surgery",
    href: "/treatments/cosmetic-plastic-surgery",
    description: "Enhance your appearance with cosmetic and reconstructive procedures.",
  },
  {
    title: "Bariatric Surgery",
    href: "/treatments/bariatric-surgery",
    description: "Effective weight-loss solutions including gastric sleeve and bypass.",
  },
  {
    title: "Orthopaedics",
    href: "/treatments/orthopaedics",
    description: "Expert care for joints, bones, ligaments, and tendons.",
  },
  {
    title: "Dental & Maxillofacial",
    href: "/treatments/dental-maxillofacial",
    description: "Advanced dental treatments, implants, and jaw surgery.",
  },
  {
    title: "Ophthalmology",
    href: "/treatments/ophthalmology",
    description: "Vision correction, cataract surgery, and retinal treatments.",
  },
  {
    title: "Cardiac Surgery",
    href: "/treatments/cardiac-surgery",
    description: "World-class heart surgery including bypass and valve repair.",
  },
    {
    title: "Neurosurgery",
    href: "/treatments/neurosurgery",
    description: "Surgical treatments for brain, spine, and nervous system.",
  },
  {
    title: "Obstetrics & Gynaecology",
    href: "/treatments/obstetrics-gynaecology",
    description: "Women's health services, maternity care, and surgery.",
  },
  {
    title: "Urology",
    href: "/treatments/urology",
    description: "Treatment for urinary tract, men's health, and kidney stones.",
  },
  {
    title: "ENT",
    href: "/treatments/ent",
    description: "Care for ear, nose, and throat conditions.",
  },
    {
    title: "General Surgery",
    href: "/treatments/general-surgery",
    description: "Surgery for abdominal and digestive conditions.",
  },
    {
    title: "View All Treatments",
    href: "/treatments",
    description: "Explore our full range of medical services and procedures.",
  },
]

export function MainNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Treatments Mega Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Treatments</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[85vw] gap-3 p-4 md:w-[90vw] md:grid-cols-4 lg:w-[1000px] ">
              {treatments.map((treatment) => (
                <ListItem
                  key={treatment.title}
                  title={treatment.title}
                  href={treatment.href}
                >
                  {treatment.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Other Links */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#services" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Services
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#how-it-works" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              How It Works
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/meet-our-team" as Route} className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Team
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={"/blog" as Route} className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Blog
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#about" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#contact" className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
              Contact
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={(href || "#") as Route}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
