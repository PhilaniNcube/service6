import "server-only";
import db from "@/drizzle/client";
import { patients, users } from "@/drizzle/tables";
import { asc, eq } from "drizzle-orm";
import { cache } from "react";

export const getPatients = cache(async () => {
  const rows = await db
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
    })
    .from(patients)
    .leftJoin(users, eq(patients.user_id, users.id))
    .orderBy(asc(patients.user_id));

  return rows.map((row) => ({
    id: row.id,
    user_id: row.user_id,
    referring_physician_id: row.referring_physician_id,
    patient_consent: row.patient_consent,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
  }));
});

export const getPatientsByReferringPhysicianId = cache(
  async (referringPhysicianId: number) => {
    const rows = await db
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
      })
      .from(patients)
      .leftJoin(users, eq(patients.user_id, users.id))
      .where(eq(patients.referring_physician_id, referringPhysicianId))
      .orderBy(asc(patients.user_id));

    return rows.map((row) => ({
      id: row.id,
      user_id: row.user_id,
      referring_physician_id: row.referring_physician_id,
      patient_consent: row.patient_consent,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
    }));
  }
);

export const getPatientByUserId = cache(async (userId: number) => {
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.user_id, userId))
    .limit(1);

  return patient || null;
});
