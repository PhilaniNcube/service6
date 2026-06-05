"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const routeNames: Record<string, string> = {
  "/profile": "Profile",
  "/medical-history": "Medical History",
  "/appointments": "Appointments",
  "/settings": "Settings",
}

export function DynamicBreadcrumbs() {
  const pathname = usePathname()
  
  const currentPageName = routeNames[pathname] || "Dashboard"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/profile">
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname !== "/profile" && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
