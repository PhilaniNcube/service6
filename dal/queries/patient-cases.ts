import "server-only";

import db from "@/drizzle/client";
import { patient_cases, procedures } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getPatientCasesByPatientId = cache(async (patientId: number) => {
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
      createdAt: patient_cases.createdAt,
      updatedAt: patient_cases.updatedAt,
      procedure_name: procedures.name,
    })
    .from(patient_cases)
    .leftJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
    .where(eq(patient_cases.patient_id, patientId));

  return rows;
});
