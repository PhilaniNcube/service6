import "server-only";
import db from "@/drizzle/client";
import { medical_background } from "@/drizzle/tables";
import { eq } from "drizzle-orm";

import { currentUser } from "@clerk/nextjs/server";
import { cacheLife, cacheTag } from "next/cache";


export async function getMedicalHistorySummaryByClerkId(clerkId: string) {
  "use cache: private";
  cacheLife("minutes");
  cacheTag(`medical_history-${clerkId}`);

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const data = await db
    .select()
    .from(medical_background)
    .where(eq(medical_background.clerk_id, clerkId))
    .execute();

  return data;
}
