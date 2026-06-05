import "server-only";

import db from "@/drizzle/client";
import {
  allergies,
  medical_background,
  medical_conditions,
  medications,
  past_surgeries,
  users,
} from "@/drizzle/tables";
import { desc, eq, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export async function getDashboardActiveMedications(userId: number) {
  "use cache: private";
  cacheTag("dashboard-medical");
  cacheLife("minutes");

  const rows = await db
    .select({
      id: medications.id,
      name: medications.name,
      dosage: medications.dosage,
      frequency: medications.frequency,
      start_date: medications.start_date,
    })
    .from(medications)
    .where(eq(medications.user_id, userId))
    .orderBy(desc(medications.createdAt))
    .limit(5);

  return rows;
}

export async function getDashboardRecentAllergies(limit = 5) {
  "use cache";
  cacheTag("dashboard-medical");
  cacheLife("minutes");

  const rows = await db
    .select({
      id: allergies.id,
      allergy: allergies.allergy,
      createdAt: allergies.createdAt,
      user_name: users.first_name,
    })
    .from(allergies)
    .leftJoin(users, eq(allergies.user_id, users.id))
    .orderBy(desc(allergies.createdAt))
    .limit(limit);

  return rows;
}

export async function getDashboardRecentSurgeries(limit = 5) {
  "use cache";
  cacheTag("dashboard-medical");
  cacheLife("minutes");

  const rows = await db
    .select({
      id: past_surgeries.id,
      notes: past_surgeries.notes,
      createdAt: past_surgeries.createdAt,
      user_name: users.first_name,
    })
    .from(past_surgeries)
    .leftJoin(users, eq(past_surgeries.user_id, users.id))
    .orderBy(desc(past_surgeries.createdAt))
    .limit(limit);

  return rows;
}

export async function getDashboardMedicalConditionsOverview() {
  "use cache";
  cacheTag("dashboard-medical");
  cacheLife("minutes");

  const rows = await db
    .select({
      condition: medical_conditions.condition,
      count: sql<number>`count(${medical_background.id})`.as("count"),
    })
    .from(medical_conditions)
    .leftJoin(
      medical_background,
      eq(medical_conditions.medical_background_id, medical_background.id)
    )
    .groupBy(medical_conditions.condition);

  const result: Record<string, number> = {};
  for (const row of rows) {
    result[row.condition] = Number(row.count ?? 0);
  }

  return result;
}
