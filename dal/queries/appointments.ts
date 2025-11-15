import "server-only";

import db from "@/drizzle/client";
import { appointments, patients, referring_physicians, users } from "@/drizzle/tables";
import { and, eq } from "drizzle-orm";

export async function getAppointmentsByPatientCaseId(patientCaseId: number) {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.patient_case_id, patientCaseId));

  return rows;
}

export async function getAppointmentsByUserClerkId(clerkId: string) {
  const rows = await db
    .select({
      appointment: appointments,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patient_id, patients.id))
    .innerJoin(users, eq(patients.user_id, users.id))
    .where(eq(users.clerk_id, clerkId));

  return rows.map((row) => row.appointment);
}

export async function getDoctorAppointments(clerkId: string) {
  const [referring] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, clerkId))
    .limit(1);

  if (!referring) return [];

  const rows = await db
    .select({
      id: appointments.id,
      scheduled_at: appointments.scheduled_at,
      notes: appointments.notes,
      patient_first_name: users.first_name,
      patient_last_name: users.last_name,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patient_id, patients.id))
    .innerJoin(users, eq(patients.user_id, users.id))
    .where(and(eq(appointments.referring_physician_id, referring.id)));

  return rows;
}
