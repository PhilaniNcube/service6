import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAppointmentsByPatientCaseId, getPatientCasesByPatientId } from "@/dal/queries";
import { CaseAppointments } from "./case-appointments";

interface PatientCasesServerProps {
  patientId: number;
  referringPhysicianId: number;
}

export async function PatientCasesServer({
  patientId,
  referringPhysicianId,
}: PatientCasesServerProps) {
  const cases = await getPatientCasesByPatientId(patientId);

  if (!cases.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Patient cases</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No cases have been created for this patient yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Patient cases</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cases.map(async (c) => {
          const appointments = await getAppointmentsByPatientCaseId(c.id);

          return (
          <div key={c.id} className="border rounded-md p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="font-medium text-sm">{c.diagnosis_name}</p>
              
              </div>
              <Badge variant="outline" className="text-xs capitalize">
                {c.case_complexity}
              </Badge>
            </div>
            {c.icd_code && (
              <p className="text-xs text-muted-foreground">ICD code: {c.icd_code}</p>
            )}
            {c.procedure_name && (
              <p className="text-xs text-muted-foreground">Procedure: {c.procedure_name}</p>
            )}
            {c.preferred_timeline && (
              <p className="text-xs text-muted-foreground">Timeline: {c.preferred_timeline}</p>
            )}
            {c.referral_reason && (
              <p className="text-xs text-muted-foreground">Reason: {c.referral_reason}</p>
            )}
            {c.recommended_procedure && (
              <p className="text-xs text-muted-foreground">Recommendation: {c.recommended_procedure}</p>
            )}

            <CaseAppointments
              appointments={appointments}
              patientId={patientId}
              patientCaseId={c.id}
              referringPhysicianId={referringPhysicianId}
            />
          </div>
        );
        })}
      </CardContent>
    </Card>
  );
}
