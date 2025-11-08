import React, { Suspense } from "react";
import { ClientOverview } from "./_components/client-overview";
import { ClientMedicalHistory } from "./_components/client-medical-history";
import { ClientDesiredProcedures } from "./_components/client-desired-procedures";

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
        <Suspense fallback={<div>Loading...</div>}>
          <ClientOverview params={paramsPromise} />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <ClientDesiredProcedures params={paramsPromise} />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <ClientMedicalHistory params={paramsPromise} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
