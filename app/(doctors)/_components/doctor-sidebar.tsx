"use client";

import * as React from "react";
import { StethoscopeIcon, UserIcon, CalendarIcon, FileTextIcon, PlusCircleIcon, ListChecksIcon, SettingsIcon, ReceiptIcon } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Route } from "next";



const doctorNav: { title: string; url: Route; icon: React.ComponentType<{ className?: string }>; }[] = [
  {
    title: "Overview",
    url: "/doctors" as Route,
    icon: StethoscopeIcon,
  },
  {
    title: "My Patients",
    url: "/doctors/patients" as Route,
    icon: UserIcon,
  },
  {
    title: "Referrals",
    url: "/doctors/referrals" as Route,
    icon: ListChecksIcon,
  },
  {
    title: "Appointments",
    url: "/doctors/appointments" as Route,
    icon: CalendarIcon,
  },
  {
    title: "Invoices",
    url: "/doctors/invoices" as Route,
    icon: ReceiptIcon,
  },
  {
    title: "Clinical Notes",
    url: "/doctors/notes" as Route,
    icon: FileTextIcon,
  },
  {
    title: "New Referral",
    url: "/doctors/new-referral" as Route,
    icon: PlusCircleIcon,
  },
  {
    title: "My Profile",
    url: "/doctors/profile" as Route,
    icon: SettingsIcon,
  },
];

export function DoctorSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href="/doctors">
                <StethoscopeIcon className="size-5!" />
                <span className="text-base font-semibold">Doctor Portal</span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {doctorNav.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
