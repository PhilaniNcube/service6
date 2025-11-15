"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconClipboard,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconTimeDuration90,
  IconTimelineEvent,
  IconUserHeart,
  IconUsers,
} from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { StethoscopeIcon } from "lucide-react"
import Link from "next/link"
import { User } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: IconUserHeart,
    },
    {
      title: "Doctors",
      url: "/dashboard/doctors",
      icon: IconClipboard,
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: IconTimelineEvent,
    },
    {
      title: "Specialties",
      url: "/dashboard/specialties",
      icon: IconListDetails,
    },
 
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <StethoscopeIcon className="size-5!" />
                <span className="text-base font-semibold">Services6</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
       <UserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
