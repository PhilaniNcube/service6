"use client"

import Link from "next/link"
import { User, FileText, Calendar, Home } from "lucide-react"
import { Route } from "next"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

const sidebarLinks = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Medical History",
    href: "/medical-history",
    icon: FileText,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
]

export function UserSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-full" asChild>
              <Link href="/">
               
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Image
                    src="/logo.webp"
                    alt="Patient Portal Logo"
                    width={100}
                    height={24}
                    className="mb-1"
                  /> 
                  <span className="truncate text-xs">Patient Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={link.title}
                    >
                      <Link href={link.href as Route<string>}>
                        <Icon />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "size-8"
                  }
                }}
              />
              <div className="flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">My Account</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
