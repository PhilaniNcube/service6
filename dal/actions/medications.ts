"use server";

import { addMedicationSchema } from "@/lib/schemas";
import { getCurrentUser } from "../queries/users";
import db from "@/drizzle/client";
import { medications } from "@/drizzle/tables";
import { revalidatePath, revalidateTag } from "next/cache";
import { eq } from "drizzle-orm";

export async function addMedication(prevState: unknown, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const validatedData = addMedicationSchema.safeParse({
    name: formData.get("name"),
    dosage: formData.get("dosage"),
    frequency: formData.get("frequency"),
    start_date: formData.get("start_date") || undefined,
    end_date: formData.get("end_date") || undefined,
  });

  if (!validatedData.success) {
    return {
      success: false,
      error: validatedData.error,
    };
  }

  const data = validatedData.data;

  // Insert medication into the database
  await db.insert(medications).values({
    user_id: user.id,
    clerk_id: user.clerk_id,
    name: data.name,
    dosage: data.dosage,
    frequency: data.frequency,
    start_date: data.start_date ? new Date(data.start_date) : null,
    end_date: data.end_date ? new Date(data.end_date) : null,
  });

  revalidateTag(`medications-${user.id}`, "max");
  revalidatePath("/medical-history");

  return {
    success: true,
  };
}

export async function deleteMedication(medicationId: number, userId: string) {
  await db.delete(medications).where(eq(medications.id, medicationId));
  revalidateTag(`medications-${userId}`, "max");
  revalidatePath("/medical-history");
}
