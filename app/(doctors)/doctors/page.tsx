import { auth } from "@clerk/nextjs/server";
import { getDoctorUserByIdFromClerk } from "@/dal/queries/users";
import { getPatientsByReferringPhysicianId } from "@/dal/queries/patients";
import { getDoctorAppointments } from "@/dal/queries/appointments";
import { getPatientCasesByPatientId } from "@/dal/queries/patient-cases";
import { appointments, referring_physicians } from "@/drizzle/tables";
import db from "@/drizzle/client";
import { and, count, eq, gte, lt } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const appointmentsForDoctor = await getDoctorAppointments(userId);

  // Today range (00:00 - 23:59) for appointment filtering
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);

  const todayAppointments = appointmentsForDoctor.filter((appt) => {
    const scheduledAt = new Date(appt.scheduled_at);
    return scheduledAt >= startOfToday && scheduledAt < startOfTomorrow;
  });

  const totalPatients = patients.length;
  const totalAppointments = appointmentsForDoctor.length;

  // Load recent patient cases for this doctor's patients
  const patientCases = (
    await Promise.all(
      patients.map((patient) => getPatientCasesByPatientId(patient.id))
    )
  )
    .flat()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const [{ value: proceduresThisMonth } = { value: 0 }] = await db
    .select({ value: count(appointments.id) })
    .from(appointments)
    .where(
      and(
        eq(appointments.referring_physician_id, referring.id),
        gte(appointments.scheduled_at, startOfMonth(startOfToday)),
        lt(appointments.scheduled_at, startOfNextMonth(startOfToday))
      )
    );

  return {
    doctorUser,
    patients,
    appointments: appointmentsForDoctor,
    todayAppointments,
    totalPatients,
    totalAppointments,
    proceduresThisMonth,
    patientCases,
  };
}

function startOfMonth(date: Date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfNextMonth(date: Date) {
  const d = startOfMonth(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

const StatCard = ({ label, value, helper }: { label: string; value: string | number; helper?: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-semibold">{value}</div>
      {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
    </CardContent>
  </Card>
);

type DoctorAppointment = Awaited<ReturnType<typeof getDoctorAppointments>>[number];

const ScheduleCard = ({
  appointments,
}: {
  appointments: DoctorAppointment[];
}) => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader>
      <CardTitle>Today&apos;s Schedule</CardTitle>
      <p className="text-sm text-muted-foreground">Your appointments for today</p>
    </CardHeader>
    <CardContent className="space-y-4">
      {appointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You have no appointments scheduled for today.
        </p>
      ) : (
        appointments.map((appt) => {
          const time = new Date(appt.scheduled_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={appt.id}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
            >
              <div>
                <div className="font-medium">
                  {appt.patient_first_name} {appt.patient_last_name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {appt.notes || "Consultation"}
                </div>
                <div className="text-xs text-muted-foreground">{time}</div>
              </div>
            </div>
          );
        })
      )}
    </CardContent>
  </Card>
);

type PatientCaseSummary =
  Awaited<ReturnType<typeof getPatientCasesByPatientId>>[number];

const ReferralsCard = ({
  cases,
}: {
  cases: PatientCaseSummary[];
}) => (
  <Card className="col-span-1 lg:col-span-1">
    <CardHeader>
      <CardTitle>Patient Cases</CardTitle>
      <p className="text-sm text-muted-foreground">
        Latest patient cases for your referred patients
      </p>
    </CardHeader>
    <CardContent className="space-y-4">
      {cases.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No recent patient cases for your patients.
        </p>
      ) : (
        cases.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between text-sm"
          >
            <div>
              <div className="font-medium">{c.diagnosis_name}</div>
              <div className="text-xs text-muted-foreground">
                {c.procedure_name || c.recommended_procedure}
              </div>
              <div className="text-xs text-muted-foreground">
                Complexity: {c.case_complexity}
              </div>
            </div>
          </div>
        ))
      )}
    </CardContent>
  </Card>
);

const DoctorsHomePage = async () => {
  const context = await getDoctorContext();

  if (!context) {
    return (
      <div className="space-y-2 p-4 lg:p-6">
        <h1 className="text-3xl font-bold tracking-tight">Doctor dashboard</h1>
        <p className="text-muted-foreground">
          No referring physician profile is linked to your account yet.
        </p>
      </div>
    );
  }

  const {
    doctorUser,
    patients,
    todayAppointments,
    totalPatients,
    totalAppointments,
    proceduresThisMonth,
    patientCases,
  } = context;

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Doctor dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {doctorUser.firstName} {doctorUser.lastName}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={totalPatients} />
        <StatCard
          label="Today&apos;s Appointments"
          value={todayAppointments.length}
        />
        <StatCard
          label="All Appointments"
          value={totalAppointments}
        />
        <StatCard
          label="Procedures This Month"
          value={proceduresThisMonth}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ScheduleCard appointments={todayAppointments} />
        <ReferralsCard cases={patientCases} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Assigned patients</h2>
        {patients.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            You have no assigned patients yet.
          </p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Patient list</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm">
                {patients.map((patient) => (
                  <li
                    key={patient.id}
                    className="flex items-center justify-between rounded-md border px-3 py-2"
                  >
                    <span>
                      {patient.first_name} {patient.last_name}
                    </span>
                    <span className="text-xs text-muted-foreground">{patient.email}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default DoctorsHomePage;
