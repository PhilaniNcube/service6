
import React, { Suspense } from "react";
import { ClientOverview } from "@/features/client/components/client-overview";
import { ClientDesiredProcedures } from "@/features/client/components/client-desired-procedures";
import { ClientMedicalHistory } from "@/features/client/components/client-medical-history";
import { ClientOverviewSkeleton } from "@/features/client/components/client-overview.skeleton";
import { ClientDesiredProceduresSkeleton } from "@/features/client/components/client-desired-procedures.skeleton";
import { ClientMedicalHistorySkeleton } from "@/features/client/components/client-medical-history.skeleton";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const paramsPromise = params;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Details</h1>
          <p className="text-muted-foreground">
            Comprehensive view of client information and medical history
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Client Overview */}
        <Suspense fallback={<ClientOverviewSkeleton />}>
          <ClientOverview params={paramsPromise} />
        </Suspense>

        <Suspense fallback={<ClientDesiredProceduresSkeleton />}>
          <ClientDesiredProcedures params={paramsPromise} />
        </Suspense>

        <Suspense fallback={<ClientMedicalHistorySkeleton />}>
          <ClientMedicalHistory params={paramsPromise} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;


