import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getReferringPhysicianByClerkId } from "@/dal/queries/referring-physicians";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { User, Users } from "lucide-react";
import { Route } from "next";

const DoctorPatientsCard = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const referring = await getReferringPhysicianByClerkId(id);
  if (!referring) return null;

  const patients = await getPatientsByReferringPhysicianId(referring.id);

  return (
    <Card>
      <CardHeader className="flex items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Users className="h-4 w-4" />
            Referred Patients
          </CardTitle>
          <CardDescription>
            Patients currently associated to this referring physician.
          </CardDescription>
        </div>
        <Badge variant="outline">{patients.length} patient{patients.length === 1 ? "" : "s"}</Badge>
      </CardHeader>
      <CardContent>
        {patients.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No patients are linked to this referring physician yet.
          </p>
        ) : (
          <div className="space-y-3">
            {patients.map((patient) => {
              const fullName =
                patient.first_name || patient.last_name
                  ? `${patient.first_name ?? ""} ${patient.last_name ?? ""}`.trim()
                  : "Unnamed patient";

              return (
                <Link
                  key={patient.id}
                  href={`/dashboard/doctors/${String(id)}/patients/${String(patient.id)}` as Route}
                  className="block rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        <User className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium leading-none">{fullName}</p>
                      {patient.email && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {patient.email}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorPatientsCard;
