import { notFound } from "next/navigation";
import { getPatientWithCases } from "@/features/referral/patient-cases-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  FileTextIcon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
} from "lucide-react";

interface PatientDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  submitted: "default",
  under_review: "secondary",
  approved: "outline",
  in_treatment: "default",
  completed: "secondary",
  follow_up: "outline",
  cancelled: "destructive",
};

const complexityColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  straightforward: "outline",
  moderate: "secondary",
  complex: "default",
  "highly complex": "destructive",
};

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  return params.then(async ({ id }) => {
    const patientId = parseInt(id, 10);

    if (isNaN(patientId)) {
      notFound();
    }

    const patient = await getPatientWithCases(patientId);

    if (!patient) {
      notFound();
    }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {patient.first_name} {patient.last_name}
        </h1>
        <p className="text-muted-foreground">Patient Details & Referral History</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserIcon className="h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
                <span>{patient.email || "No email"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phone_number || "No phone"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                <span>{patient.country || "No country"}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consent Status</span>
                <Badge variant="outline" className="capitalize">
                  {patient.patient_consent || "Unknown"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Registered</span>
                <span>{patient.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileTextIcon className="h-5 w-5" />
              Referral Cases ({patient.cases.length})
            </CardTitle>
            <CardDescription>
              All referral cases for this patient
            </CardDescription>
          </CardHeader>
          <CardContent>
            {patient.cases.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No referral cases found for this patient.
              </p>
            ) : (
              <div className="space-y-4">
                {patient.cases.map((patientCase) => (
                  <div
                    key={patientCase.id}
                    className="rounded-lg border p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{patientCase.diagnosis_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {patientCase.procedure_name || "Procedure TBD"}
                        </p>
                      </div>
                      <Badge
                        variant={statusColors[patientCase.status || "submitted"] || "outline"}
                        className="capitalize"
                      >
                        {patientCase.status || "submitted"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Complexity:</span>{" "}
                        <Badge
                          variant={complexityColors[patientCase.case_complexity || "moderate"] || "outline"}
                          className="capitalize"
                        >
                          {patientCase.case_complexity || "Not specified"}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>{" "}
                        <span className="capitalize">{patientCase.preferred_timeline || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ICD Code:</span>{" "}
                        <span>{patientCase.icd_code || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reason:</span>{" "}
                        <span className="capitalize">{patientCase.referral_reason || "Not specified"}</span>
                      </div>
                    </div>

                    {patientCase.secondary_diagnoses && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Secondary Diagnoses:</span>{" "}
                        <span>{patientCase.secondary_diagnoses}</span>
                      </div>
                    )}

                    {patientCase.recommended_procedure && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Recommended Procedure:</span>{" "}
                        <span>{patientCase.recommended_procedure}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarIcon className="h-3 w-3" />
                      <span>Submitted: {patientCase.createdAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {patientCase.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
  });
}
