"use server";

import db from "@/drizzle/client";
import { allergies, users } from "@/drizzle/tables";
import { addAllergySchema } from "@/lib/schemas";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";

export async function addAllergyAction(prevState: unknown, formData: FormData) {
  const parsed = addAllergySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.name };
  }

  const { allergy, clerkId } = parsed.data;

  //   search the database for the user using the clerkId
  const user = await db
    .select()
    .from(users)
    .where(eq(users.clerk_id, clerkId))
    .limit(1)
    .then((res) => res[0]);

  // Add the allergy to the database
  await db
    .insert(allergies)
    .values({ allergy: allergy, clerk_id: clerkId, user_id: user.id });

  revalidateTag(`allergies-${user.id}`, "max");
  revalidatePath("/profile");
  return { success: true };
}

export async function deleteAllergyAction(allergyId: number, userId: string) {
  await db.delete(allergies).where(eq(allergies.id, allergyId));
  revalidateTag(`allergies-${userId}`, "max");
  revalidatePath("/profile");
}
