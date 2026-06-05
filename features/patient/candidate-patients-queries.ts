import "server-only";
import db from "@/drizzle/client";
import { patients, users } from "@/drizzle/tables";
import { asc, eq, notInArray } from "drizzle-orm";
import { cacheTag, cacheLife } from "next/cache";

export async function getCandidatePatientsForReferrer(referringPhysicianId: number) {
  "use cache";
  cacheTag("patients");
  cacheLife("minutes");

  const existing = await db
    .select({ user_id: patients.user_id })
    .from(patients)
    .where(eq(patients.referring_physician_id, referringPhysicianId));

  const existingIds = existing.map((row) => row.user_id).filter(Boolean) as number[];

  const query = db
    .select({
      id: users.id,
      first_name: users.first_name,
      last_name: users.last_name,
      email: users.email,
    })
    .from(users)
    .orderBy(asc(users.createdAt));

  const rows = existingIds.length
    ? await query.where(notInArray(users.id, existingIds))
    : await query;

  return rows.map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
  }));
}
