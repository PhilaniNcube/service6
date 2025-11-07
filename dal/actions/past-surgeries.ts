"use server";

import { pastSurgeriesSchema } from "@/lib/schemas";
import z from "zod";
import { getCurrentUser } from "../queries/users";
import db from "@/drizzle/client";
import { past_surgeries } from "@/drizzle/tables";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

export async function addPastSurgery(prevState: unknown, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const validatedData = pastSurgeriesSchema.safeParse({
    notes: formData.get("notes"),
    clerkId: formData.get("clerkId"),
  });

  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error,
    };
  }
  const data = validatedData.data;

  const pastSurgery = await db
    .insert(past_surgeries)
    .values({
      clerk_id: user.clerk_id,
      notes: data.notes,
      user_id: user.id,
    })
    .returning();

  revalidateTag(`past-surgeries-${user.id}`, "max");
  revalidatePath("/medical-history");

  return {
    success: true,
    data: pastSurgery,
  };
}

export async function deletePastSurgery(surgeryId: number, userId: string) {
  await db.delete(past_surgeries).where(eq(past_surgeries.id, surgeryId));
  revalidateTag(`past-surgeries-${userId}`, "max");
  revalidatePath("/medical-history");
}
