import { getUserProceduresByClerkId } from "@/dal/queries/procedures";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Clock, Activity, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cacheLife } from "next/cache";

interface ClientDesiredProceduresProps {
  params: Promise<{ id: string }>;
}

const timelineVariants = {
  immediate: { variant: "destructive" as const, label: "Immediate" },
  "within a month": { variant: "default" as const, label: "Within a Month" },
  "within 3 months": { variant: "default" as const, label: "Within 3 Months" },
  "within 6 months": { variant: "secondary" as const, label: "Within 6 Months" },
  "not sure": { variant: "outline" as const, label: "Not Sure" },
  researching: { variant: "outline" as const, label: "Researching" },
};

const diagnosisStatusVariants = {
  yes: { variant: "default" as const, label: "Confirmed", icon: CheckCircle2 },
  no: { variant: "secondary" as const, label: "Not Diagnosed", icon: Activity },
  awaiting: { variant: "outline" as const, label: "Awaiting Diagnosis", icon: Clock },
};

export async function ClientDesiredProcedures({ params }: ClientDesiredProceduresProps) {
  "use cache";
  cacheLife("minutes")
  const resolvedParams = await params;
  const procedures = await getUserProceduresByClerkId(resolvedParams.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5" />
          Desired Procedures
        </CardTitle>
        <CardDescription>
          Procedures the client is interested in or considering
        </CardDescription>
      </CardHeader>
      <CardContent>
        {procedures.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Stethoscope className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No desired procedures recorded</p>
          </div>
        ) : (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {procedures.map((procedure) => {
              const timeline = procedure.desired_procedures.treatment_timeline;
              const diagnosisStatus = procedure.desired_procedures.diagnosis_status;
              const painLevel = procedure.desired_procedures.pain_level;

              const timelineInfo = timeline ? timelineVariants[timeline] : null;
              const diagnosisInfo = diagnosisStatus
                ? diagnosisStatusVariants[diagnosisStatus]
                : null;
              const DiagnosisIcon = diagnosisInfo?.icon;

              return (
                <div
                  key={procedure.desired_procedures.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">
                        {procedure.procedure_name}
                      </h4>
                      {procedure.procedure_description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {procedure.procedure_description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {timelineInfo && (
                      <Badge variant={timelineInfo.variant}>
                        <Clock className="h-3 w-3 mr-1" />
                        {timelineInfo.label}
                      </Badge>
                    )}
                    {diagnosisInfo && DiagnosisIcon && (
                      <Badge variant={diagnosisInfo.variant}>
                        <DiagnosisIcon className="h-3 w-3 mr-1" />
                        {diagnosisInfo.label}
                      </Badge>
                    )}
                    {painLevel && (
                      <Badge variant="outline">
                        Pain Level: {painLevel}/10
                      </Badge>
                    )}
                  </div>

                  {procedure.desired_procedures.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Additional Notes:
                      </p>
                      <p className="text-sm">{procedure.desired_procedures.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <span>
                      Added {format(new Date(procedure.desired_procedures.createdAt), "MMM d, yyyy")}
                    </span>
                    {procedure.desired_procedures.updatedAt &&
                      new Date(procedure.desired_procedures.updatedAt).getTime() !==
                        new Date(procedure.desired_procedures.createdAt).getTime() && (
                        <span>
                          Updated{" "}
                          {format(new Date(procedure.desired_procedures.updatedAt), "MMM d, yyyy")}
                        </span>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
