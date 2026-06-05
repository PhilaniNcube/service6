import "server-only";

import db from "@/drizzle/client";
import { specialties } from "@/drizzle/tables";
import { asc } from "drizzle-orm";

export async function getSpecialties() {
  "use cache: private";

  const list = await db.select().from(specialties).orderBy(asc(specialties.name));
  return list;
}
