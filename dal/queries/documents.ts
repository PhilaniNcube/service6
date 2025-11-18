import "server-only";

import db from "@/drizzle/client";
import { documents } from "@/drizzle/tables";
import { eq } from "drizzle-orm";

export async function getDocumentsForUser(userId: number) {
  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.user_id, userId));

  return rows;
}

export async function getDocumentsByClerkId(clerkId: string) {
  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.clerk_id, clerkId));

  return rows;
}
