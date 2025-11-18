import "server-only";

import db from "@/drizzle/client";
import { appointments, documents, patient_cases, patients, procedures, referring_physicians, users } from "@/drizzle/tables";
import { and, eq } from "drizzle-orm";

export async function getAppointmentDetailById(appointmentId: number) {
  const rows = await db
    .select({
      appointment: appointments,
      patient: patients,
      patientUser: users,
      patientCase: patient_cases,
      procedure: procedures,
      referringPhysician: referring_physicians,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patient_id, patients.id))
    .innerJoin(users, eq(patients.user_id, users.id))
    .innerJoin(patient_cases, eq(appointments.patient_case_id, patient_cases.id))
    .innerJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
    .innerJoin(
      referring_physicians,
      eq(appointments.referring_physician_id, referring_physicians.id)
    )
    .where(eq(appointments.id, appointmentId))
    .limit(1);

  if (!rows.length) return null;

  const row = rows[0];

  const patientDocuments = await db
    .select()
    .from(documents)
    .where(eq(documents.user_id, row.patientUser.id));

  return {
    appointment: row.appointment,
    patient: row.patient,
    patientUser: row.patientUser,
    patientCase: row.patientCase,
    procedure: row.procedure,
    referringPhysician: row.referringPhysician,
    documents: patientDocuments,
  };
}

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

export async function getAllAppointmentsForAdmin() {
  const rows = await db
    .select({
      id: appointments.id,
      scheduled_at: appointments.scheduled_at,
      appointment_time: appointments.appointment_time,
      notes: appointments.notes,
      patient_first_name: users.first_name,
      patient_last_name: users.last_name,
      procedure_name: procedures.name,
    })
    .from(appointments)
    .innerJoin(patients, eq(appointments.patient_id, patients.id))
    .innerJoin(users, eq(patients.user_id, users.id))
    .innerJoin(patient_cases, eq(appointments.patient_case_id, patient_cases.id))
    .innerJoin(procedures, eq(patient_cases.procedure_id, procedures.id));

  return rows;
}
