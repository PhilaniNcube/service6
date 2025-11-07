import db from "@/drizzle/client";
import { getCurrentUser } from "./users";
import { medications } from "@/drizzle/tables";
import { cacheTag } from "next/cache";
import { eq } from "drizzle-orm";

export const getUserMedications = async () => {
  "use cache: private";

  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const data = await db
    .select()
    .from(medications)
    .where(eq(medications.user_id, user.id));

  cacheTag(`medications-${user.id}`, "max");

  return data;
};

export const getUserMedicationsByClerkId = async (clerkId: string) => {
  const data = await db
    .select()
    .from(medications)
    .where(eq(medications.clerk_id, clerkId));
  return data;
};
