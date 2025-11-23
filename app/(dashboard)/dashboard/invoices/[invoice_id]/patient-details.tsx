import { getPatientById } from "@/dal/queries/patients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function PatientDetails({ patientId }: { patientId: number }) {
  const patient = await getPatientById(patientId);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p>{patient.first_name} {patient.last_name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p>{patient.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone</p>
            <p>{patient.phone_number || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Country</p>
            <p>{patient.country || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
