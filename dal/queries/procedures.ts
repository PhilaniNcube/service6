import "server-only";
import db from "@/drizzle/client";
import { procedures, desired_procedures, users } from "@/drizzle/tables";
import { desc, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { cacheTag } from "next/cache";
import { ca } from "date-fns/locale";

export async function getProcedures() {
  "use cache: private";

  const proceduresList = await db.select().from(procedures);
  return proceduresList;
}

export async function getUserProcedures() {
  "use cache: private";

  const user = await currentUser();
  if (!user) return [];

  cacheTag(`desired_procedures-${user.id}`, "max");

  // Fetch desired procedures for the current user as well as the related procedure details

  const userProcedures = await db
    .select({
      desired_procedures,
      procedure_name: procedures.name,
      procedure_description: procedures.description,
    })
    .from(desired_procedures)
    .innerJoin(procedures, eq(desired_procedures.procedure_id, procedures.id))
    .where(eq(desired_procedures.clerk_id, user.id));
  return userProcedures;
}

// get the recent desired_procedures entries
export async function getRecentProcedureRequests(limit: number = 5) {
  "use cache";

  const recentRequests = await db
    .select({
      desired_procedures,
      procedure_name: procedures.name,
      procedure_description: procedures.description,
      patient_name: users.first_name,
      patient_last_name: users.last_name,
      patient_email: users.email,
    })
    .from(desired_procedures)
    .innerJoin(procedures, eq(desired_procedures.procedure_id, procedures.id))
    .innerJoin(users, eq(desired_procedures.user_id, users.id))
    .orderBy(desc(desired_procedures.createdAt))
    .limit(limit);

    cacheTag("recent_desired_procedures", "max");
  return recentRequests;
}
