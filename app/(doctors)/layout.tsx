import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import React from "react";
import { DoctorSidebar } from "./_components/doctor-sidebar";
import { DoctorHeader } from "./_components/doctor-header";

const DoctorsLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDoctor = await checkRole("doctor");

  if (!isDoctor) {
    redirect("/");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DoctorSidebar variant="inset" />
      <SidebarInset>
        <DoctorHeader />
        <main className="p-3">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoctorsLayout;
