import "server-only";

import db from "@/drizzle/client";
import { appointments } from "@/drizzle/tables";
import { eq } from "drizzle-orm";

export async function getAppointmentsByPatientCaseId(patientCaseId: number) {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.patient_case_id, patientCaseId));

  return rows;
}
