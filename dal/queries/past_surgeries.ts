import db from "@/drizzle/client";
import { past_surgeries } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getCurrentUser } from "./users";

export async function getUserPastSurgeries() {
  "use cache: private";

  const user = await getCurrentUser();
  if (!user) return [];

  const pastSurgeries = await db
    .select()
    .from(past_surgeries)
    .where(eq(past_surgeries.user_id, user.id));

  cacheTag(`past-surgeries-${user.id}`, "max");

  return pastSurgeries;
}

export async function getUserPastSurgeriesByClerkId(clerkId: string) {
  const pastSurgeries = await db
    .select()
    .from(past_surgeries)
    .where(eq(past_surgeries.clerk_id, clerkId));
  return pastSurgeries;
}
