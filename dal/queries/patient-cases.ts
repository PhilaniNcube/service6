import "server-only";

import db from "@/drizzle/client";
import { patient_cases, procedures, patients, users } from "@/drizzle/tables";
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
      status: patient_cases.status,
      createdAt: patient_cases.createdAt,
      updatedAt: patient_cases.updatedAt,
      procedure_name: procedures.name,
    })
    .from(patient_cases)
    .leftJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
    .where(eq(patient_cases.patient_id, patientId));

  return rows;
});

export const getPatientCaseById = cache(async (caseId: number) => {
  const [row] = await db
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
    })
    .from(patient_cases)
    .leftJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
    .where(eq(patient_cases.id, caseId))
    .limit(1);

  return row || null;
});

export const getPatientWithCases = cache(async (patientId: number) => {
  const [patient] = await db
    .select({
      id: patients.id,
      user_id: patients.user_id,
      referring_physician_id: patients.referring_physician_id,
      patient_consent: patients.patient_consent,
      createdAt: patients.createdAt,
      updatedAt: patients.updatedAt,
      first_name: users.first_name,
      last_name: users.last_name,
      email: users.email,
      phone_number: users.phone_number,
      country: users.country,
    })
    .from(patients)
    .leftJoin(users, eq(patients.user_id, users.id))
    .where(eq(patients.id, patientId))
    .limit(1);

  if (!patient) return null;

  const cases = await getPatientCasesByPatientId(patientId);

  return {
    ...patient,
    cases,
  };
});

export const getPatientCasesByReferringPhysicianId = cache(
  async (referringPhysicianId: number) => {
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
      })
      .from(patient_cases)
      .leftJoin(procedures, eq(patient_cases.procedure_id, procedures.id))
      .leftJoin(patients, eq(patient_cases.patient_id, patients.id))
      .leftJoin(users, eq(patients.user_id, users.id))
      .where(eq(patients.referring_physician_id, referringPhysicianId));

    return rows;
  }
);
