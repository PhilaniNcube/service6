import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { DashboardStats } from "./_components/dashboard-stats";
import { RecentPatientsTable } from "./_components/recent-patients-table";
import { ProcedureRequests } from "./_components/procedure-requests";
import { MedicalOverview } from "./_components/medical-overview";

const DashboardHome = async () => {
  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your medical practice.
        </p>
      </div>

      {/* Stats Overview */}
      {/* <DashboardStats /> */}

      <Suspense fallback={<div>Loading recent patients...</div>}>
        <RecentPatientsTable />
      </Suspense>

      {/* Procedure Requests */}
      <Suspense fallback={<div>Loading procedure requests...</div>}>
        <ProcedureRequests />
      </Suspense>

      {/* Medical Overview */}
      <Suspense fallback={<div>Loading medical overview...</div>}>
        <MedicalOverview />
      </Suspense>
    </div>
  );
};

export default DashboardHome;
