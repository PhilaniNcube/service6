"use server";

import db from "@/drizzle/client";
import { specialties, type NewSpecialty } from "@/drizzle/tables";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createSpecialtySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
});

export type CreateSpecialtyInput = z.infer<typeof createSpecialtySchema>;

export type CreateSpecialtyState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
  };
};

export async function createSpecialty(
  prevState: CreateSpecialtyState,
  formData: FormData
): Promise<CreateSpecialtyState> {
  try {
    const raw = {
      name: formData.get("name"),
    } as Record<string, unknown>;

    const parsed = createSpecialtySchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const newSpecialty: NewSpecialty = {
      name: parsed.data.name,
    };

    await db.insert(specialties).values(newSpecialty).returning();

    revalidatePath("/dashboard/specialties");

    return {
      success: true,
      message: "Specialty added successfully",
    };
  } catch (error) {
    console.error("Error creating specialty:", error);
    return {
      success: false,
      message: "Something went wrong while saving. Please try again.",
    };
  }
}
