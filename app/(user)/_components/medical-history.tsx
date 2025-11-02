import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCurrentUser } from "@/dal";
import { Stethoscope } from "lucide-react";
import React, { Suspense } from "react";
import AddMedicalHistory from "./add-medical-history";
import { Separator } from "@/components/ui/separator";
import MedicalHistorySummary from "./medical-history-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Stethoscope className="mr-2 h-4 w-4" />
              Add Medical History
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Medical History</DialogTitle>
              <DialogDescription>
                Please enter the details of your medical history including any relevant conditions.
              </DialogDescription>
            </DialogHeader>
            <AddMedicalHistory profile={profile} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <Suspense fallback={<LoadingSkeleton />}>
          <MedicalHistorySummary clerkId={profile.clerk_id} />
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
