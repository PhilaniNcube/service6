import "server-only";

import db from "@/drizzle/client";
import { documents } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export async function getDocumentsForUser(userId: number) {
  "use cache: private";
  cacheTag("documents");
  cacheLife("minutes");

  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.user_id, userId));

  return rows;
}

export async function getDocumentsByClerkId(clerkId: string) {
  "use cache: private";
  cacheTag("documents");
  cacheLife("minutes");

  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.clerk_id, clerkId));

  return rows;
}
