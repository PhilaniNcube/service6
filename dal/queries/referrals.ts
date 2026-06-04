import "server-only";

import db from "@/drizzle/client";
import { patient_cases, procedures, patients, users } from "@/drizzle/tables";
import { eq, desc } from "drizzle-orm";
import { cache } from "react";

export const getReferralsByPhysicianId = cache(async (referringPhysicianId: number) => {
  const rows = await db
    .select({
      id: patient_cases.id,
      patient_id: patient_cases.patient_id,
      diagnosis_name: patient_cases.diagnosis_name,
      icd_code: patient_cases.icd_code,
      secondary_diagnoses: patient_cases.secondary_diagnoses,
      case_complexity: patient_cases.case_complexity,
      referral_reason: patient_cases.referral_reason,
      recommended_procedure: patient_cases.recommended_procedure,
      procedure_id: patient_cases.procedure_id,
      preferred_timeline: patient_cases.preferred_timeline,
      status: patient_cases.status,
      createdAt: patient_cases.createdAt,
      updatedAt: patient_cases.updatedAt,
      procedure_name: procedures.name,
      patient_first_name: users.first_name,
      patient_last_name: users.last_name,
      patient_email: users.email,
      patient_country: users.country,
    })
    .from(patient_cases)
    .leftJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
    .leftJoin(patients, eq(patient_cases.patient_id, patients.id))
    .leftJoin(users, eq(patients.user_id, users.id))
    .where(eq(patients.referring_physician_id, referringPhysicianId))
    .orderBy(desc(patient_cases.createdAt));

  return rows;
});
