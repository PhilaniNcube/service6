import { auth } from "@clerk/nextjs/server";
import db from "@/drizzle/client";
import { referring_physicians } from "@/drizzle/tables";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { type Route } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, UserIcon } from "lucide-react";

async function getDoctorPatients() {
  const { userId } = await auth();

  if (!userId) return [];

  const [referring] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, userId))
    .limit(1);

  if (!referring) return [];

  return getPatientsByReferringPhysicianId(referring.id);
}

const DoctorPatientsPage = async () => {
  const patients = await getDoctorPatients();

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Patients</h1>
          <p className="text-muted-foreground">
            View and manage your referred patients
          </p>
        </div>
        <Button asChild>
          <Link href={"/doctors/new-referral" as Route}>
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            New Referral
          </Link>
        </Button>
      </div>

      {patients.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No patients yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Submit your first referral to get started
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Link
              key={patient.id}
              href={`/doctors/patients/${patient.id}` as Route}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                    {patient.first_name} {patient.last_name}
                  </CardTitle>
                  <CardDescription className="line-clamp-1">
                    {patient.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Registered: {patient.createdAt.toLocaleDateString()}
                    </span>
                    <span className="text-primary font-medium">View Details →</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPatientsPage;
