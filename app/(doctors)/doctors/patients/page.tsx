import { auth } from "@clerk/nextjs/server";
import db from "@/drizzle/client";
import { referring_physicians } from "@/drizzle/tables";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { eq } from "drizzle-orm";

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
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-semibold">My patients</h1>
      {patients.length === 0 ? (
        <p className="text-muted-foreground">You have no assigned patients.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {patients.map((patient) => (
            <li
              key={patient.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span>
                {patient.first_name} {patient.last_name}
              </span>
              <span className="text-xs text-muted-foreground">
                {patient.email}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorPatientsPage;
