import { allergies } from "@/drizzle/tables";
import db from "@/drizzle/client";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getCurrentUser } from "./users";

export async function getUserAllergies() {
  "use cache: private";

  const user = await getCurrentUser();
  if (!user) return [];

  const allergiesList = await db
    .select()
    .from(allergies)
    .where(eq(allergies.user_id, user.id));

  cacheTag(`allergies-${user.id}`, "max");

  return allergiesList;
}

export async function getUserAllergiesByClerkId(clerkId: string) {
  const allergiesList = await db
    .select()
    .from(allergies)
    .where(eq(allergies.clerk_id, clerkId));
  return allergiesList;
}
