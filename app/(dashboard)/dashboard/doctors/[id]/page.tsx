import React, { Suspense } from "react";
import DoctorOverview from "./_components/doctor-overview";
import DoctorDetails from "./_components/doctor-details";
import ReferringPhysicianCard from "./_components/referring-physician-card";
import DoctorPatientsCard from "./_components/doctor-patients-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DoctorLoadingFallback = () => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <div className="flex gap-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-44" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`details-${index}`} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-52" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-2 h-6 w-28" />
          </div>
          <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-44" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-56" />
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`meta-${index}`} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);

const DoctorPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="space-y-6">
      <Suspense fallback={<DoctorLoadingFallback />}>
        <DoctorOverview params={params} />
        <DoctorDetails paramsPromise={params} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReferringPhysicianCard params={params} />
          <DoctorPatientsCard params={params} />
        </div>
      </Suspense>
    </div>
  );
};

export default DoctorPage;
