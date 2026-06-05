import { auth } from "@clerk/nextjs/server";
import db from "@/drizzle/client";
import { referring_physicians } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { getReferralsByPhysicianId } from "@/features/referral/referrals-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Route } from "next";
import { PlusCircleIcon, FileTextIcon } from "lucide-react";
import type { ReferralStatus } from "@/drizzle/tables";

const statusConfig: Record<
  ReferralStatus,
  { label: string; color: string; bgColor: string }
> = {
  submitted: { label: "Submitted", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  under_review: { label: "Under Review", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200" },
  approved: { label: "Approved", color: "text-green-700", bgColor: "bg-green-50 border-green-200" },
  in_treatment: { label: "In Treatment", color: "text-purple-700", bgColor: "bg-purple-50 border-purple-200" },
  completed: { label: "Completed", color: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-200" },
  follow_up: { label: "Follow Up", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
  cancelled: { label: "Cancelled", color: "text-red-700", bgColor: "bg-red-50 border-red-200" },
};

const statusOrder: ReferralStatus[] = [
  "submitted",
  "under_review",
  "approved",
  "in_treatment",
  "completed",
  "follow_up",
  "cancelled",
];

async function getDoctorReferrals() {
  const { userId } = await auth();

  if (!userId) return { referrals: [], referringId: null };

  const [referring] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, userId))
    .limit(1);

  if (!referring) return { referrals: [], referringId: null };

  const referrals = await getReferralsByPhysicianId(referring.id);

  return { referrals, referringId: referring.id };
}

export default async function ReferralsPage() {
  const { referrals } = await getDoctorReferrals();

  const groupedByStatus = statusOrder.reduce(
    (acc, status) => {
      acc[status] = referrals.filter((r) => r.status === status);
      return acc;
    },
    {} as Record<ReferralStatus, typeof referrals>
  );

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Referral Pipeline</h1>
          <p className="text-muted-foreground">
            Track the status of all your patient referrals
          </p>
        </div>
        <Button asChild>
          <Link href={"/doctors/new-referral" as Route}>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            New Referral
          </Link>
        </Button>
      </div>

      {referrals.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileTextIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No referrals yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your first referral to see it in the pipeline
            </p>
            <Button asChild>
              <Link href={"/doctors/new-referral" as Route}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Submit Referral
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {statusOrder.map((status) => {
            const config = statusConfig[status];
            const cases = groupedByStatus[status];

            if (cases.length === 0) return null;

            return (
              <div key={status} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg font-semibold ${config.color}`}>
                    {config.label}
                  </h2>
                  <Badge variant="outline" className="text-xs">
                    {cases.length}
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cases.map((referral) => (
                    <Link
                      key={referral.id}
                      href={`/doctors/patients/${referral.patient_id}` as Route}
                      className="block"
                    >
                      <Card
                        className={`hover:shadow-lg transition-shadow cursor-pointer border ${config.bgColor}`}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-base">
                                {referral.patient_first_name} {referral.patient_last_name}
                              </CardTitle>
                              <CardDescription className="line-clamp-1">
                                {referral.diagnosis_name}
                              </CardDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs capitalize ${config.color}`}
                            >
                              {referral.case_complexity}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Procedure:</span>
                              <span className="font-medium text-right">
                                {referral.procedure_name || "TBD"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Timeline:</span>
                              <span className="capitalize">{referral.preferred_timeline}</span>
                            </div>
                            {referral.patient_country && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Country:</span>
                                <span>{referral.patient_country}</span>
                              </div>
                            )}
                            <div className="pt-2 text-xs text-muted-foreground">
                              Submitted: {referral.createdAt.toLocaleDateString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
