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

// Active medications for the currently logged-in user
export async function getDashboardActiveMedications(userId: number) {
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

// Recent allergies (latest across all users)
export async function getDashboardRecentAllergies(limit = 5) {
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

// Recent surgeries (latest across all users)
export async function getDashboardRecentSurgeries(limit = 5) {
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

// Aggregate condition counts across all medical backgrounds
export async function getDashboardMedicalConditionsOverview() {
  const rows = await db
    .select({
      condition: medical_conditions.condition,
      // drizzle-orm sqlite aggregation using raw SQL count
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
