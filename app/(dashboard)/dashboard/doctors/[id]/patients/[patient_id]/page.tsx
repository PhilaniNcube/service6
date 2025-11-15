import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getReferringPhysicianByClerkId } from "@/dal/queries/referring-physicians";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { Mail, User, Users } from "lucide-react";
import { AddPatientCaseDialog } from "./_components/add-patient-case-dialog";
import { PatientCasesServer } from "./_components/patient-cases-server";
import { getProcedures } from "@/dal/queries/procedures";

interface PageProps {
  params: Promise<{ id: string; patient_id: string }>;
}

const DoctorPatientPage = async ({ params }: PageProps) => {
  const { id, patient_id } = await params;

  const referring = await getReferringPhysicianByClerkId(id);
  if (!referring) {
    return notFound();
  }

  const patients = await getPatientsByReferringPhysicianId(referring.id);
  const patient = patients.find((p) => String(p.id) === String(patient_id));

  if (!patient) {
    return notFound();
  }

  const fullName =
    patient.first_name || patient.last_name
      ? `${patient.first_name ?? ""} ${patient.last_name ?? ""}`.trim()
      : "Unnamed patient";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Doctor / Patients / Patient #{patient.id}
          </p>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5" /> Patient Details
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View details for this patient referred by the selected doctor.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          {/* Server-fetched procedures passed down to the dialog */}
          <AddPatientCaseDialog
            patientId={patient.id}
            procedures={await getProcedures()}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-lg">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{fullName}</CardTitle>
              <CardDescription>
                Internal patient ID #{patient.id}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">First name</p>
                <p className="text-sm">{patient.first_name ?? "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Last name</p>
                <p className="text-sm">{patient.last_name ?? "Not provided"}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-muted-foreground">Email</p>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.email ?? "Not provided"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Referral Details</CardTitle>
            <CardDescription>
              Relationship between this patient and the referring physician.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Referring physician</p>
              <p className="font-medium">{referring.full_name}</p>
              {referring.specialty_name && (
                <p className="text-xs text-muted-foreground">{referring.specialty_name}</p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Patient consent</p>
              <Badge variant={patient.patient_consent ? "default" : "outline"} className="mt-1">
                {patient.patient_consent ? "Consent captured" : "Consent not captured"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <PatientCasesServer
        patientId={patient.id}
        referringPhysicianId={referring.id}
      />
    </div>
  );
};

export default DoctorPatientPage;
