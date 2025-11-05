import { getCurrentUser } from "@/dal";

import React, { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import MedicalHistorySummary from "./medical-history-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AddDesiredProcedure from "./add-desired-procedure";
import Procedures from "./procedures";

const MedicalHistoryComponent = async () => {
  const profile = await getCurrentUser();

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medical History</h1>
          <p className="text-muted-foreground">
            View and manage your medical history records
          </p>
        </div>
      </div>

      <Separator />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Suspense fallback={<LoadingSkeleton />}>
          <MedicalHistorySummary profile={profile} />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Procedures />
        </Suspense>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32 mt-2" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </CardContent>
  </Card>
);

export default MedicalHistoryComponent;
