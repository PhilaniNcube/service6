import "server-only";
import db from "@/drizzle/client";
import { users, procedures, desired_procedures } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { cacheTag } from "next/cache";

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
