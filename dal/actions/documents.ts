"use server";


import db from "@/drizzle/client";
import { documents, type NewDocument } from "@/drizzle/tables";
import { getUserByClerkId } from "@/dal/queries/users";

type CreateDocumentInput = {
  clerkId: string;
  storageKey: string;
  documentType: string;
  fileType: string;
  fileSizeBytes: number;
  width?: number | null;
  height?: number | null;
};

export async function createDocumentRecord(input: CreateDocumentInput) {
  const user = await getUserByClerkId(input.clerkId);

  if (!user) {
    throw new Error("User not found for provided clerkId");
  }

  const values: NewDocument = {
    user_id: user.id,
    clerk_id: input.clerkId,
    storage_key: input.storageKey,
    document_type: input.documentType as NewDocument["document_type"],
    file_type: input.fileType as NewDocument["file_type"],
    file_size_bytes: input.fileSizeBytes,
    width: input.width ?? null,
    height: input.height ?? null,
    // createdAt/updatedAt are database defaults
  };

  const [row] = await db.insert(documents).values(values).returning();

  return row;
}
