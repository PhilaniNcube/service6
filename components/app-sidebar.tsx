"use client";

import * as React from "react";
import {
  IconClipboard,
  IconDashboard,
  IconFileDescription,
  IconListDetails,
  IconTimelineEvent,
  IconUserHeart,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

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
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: IconFileDescription,
    },
    {
      title: "Specialties",
      url: "/dashboard/specialties",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-2.5!"
            >
              <Link href="/" className="">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Image
                    src="/logo.webp"
                    alt="Patient Portal Logo"
                    width={100}
                    height={24}
                    className=""
                  />
                </div>
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
  );
}
