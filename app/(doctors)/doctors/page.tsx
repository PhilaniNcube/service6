import { auth } from "@clerk/nextjs/server";
import { getDoctorUserByIdFromClerk } from "@/dal/queries/users";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { referring_physicians } from "@/drizzle/tables";
import db from "@/drizzle/client";
import { eq } from "drizzle-orm";

async function getDoctorContext() {
  const { userId } = await auth();

  if (!userId) return null;

  const [referring] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, userId))
    .limit(1);

  if (!referring) return null;

  const doctorUser = await getDoctorUserByIdFromClerk(userId);
  const patients = await getPatientsByReferringPhysicianId(referring.id);

  return { doctorUser, patients };
}

const DoctorsHomePage = async () => {
  const context = await getDoctorContext();

  if (!context) {
    return (
      <div className="space-y-2 p-4">
        <h1 className="text-2xl font-semibold">Doctor dashboard</h1>
        <p className="text-muted-foreground">
          No referring physician profile is linked to your account yet.
        </p>
      </div>
    );
  }

  const { doctorUser, patients } = context;

  return (
    <div className="space-y-6 p-4">
      <section>
        <h1 className="text-2xl font-semibold">Doctor dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {doctorUser.firstName} {doctorUser.lastName}
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Assigned patients</h2>
        {patients.length === 0 ? (
          <p className="text-muted-foreground">You have no assigned patients yet.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {patients.map((patient) => (
              <li key={patient.id} className="flex items-center justify-between rounded border px-3 py-2">
                <span>
                  {patient.first_name} {patient.last_name}
                </span>
                <span className="text-xs text-muted-foreground">{patient.email}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DoctorsHomePage;
