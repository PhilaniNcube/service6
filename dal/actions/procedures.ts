"use server";

import db from "@/drizzle/client";
import {
  desired_procedures,
  treatment_timelines,
  users,
  type NewDesiredProcedure,
} from "@/drizzle/tables";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";

const createDesiredProcedureSchema = z.object({
  procedure_id: z.coerce.number().int().positive(),
  clerk_id: z.string().min(1),
  notes: z.string().max(1000).optional().nullable(),
  treatment_timelines: z.enum(treatment_timelines).optional().nullable(),
  pain_level: z.coerce.number().min(1).max(10).optional().nullable(),
  diagnosis_status: z.enum(["yes", "no", "awaiting"]).optional().nullable(),
});

export type CreateDesiredProcedureInput = z.infer<
  typeof createDesiredProcedureSchema
>;

export type CreateDesiredProcedureState = {
  success: boolean;
  message: string;
  errors?: {
    procedure_id?: string[];
    clerk_id?: string[];
    notes?: string[];
    treatment_timelines?: string[];
    pain_level?: string[];
    diagnosis_status?: string[];
  };
};

export const createDesiredProcedure = async (
  prevState: CreateDesiredProcedureState,
  formData: FormData
): Promise<CreateDesiredProcedureState> => {
  try {
    const raw = {
      procedure_id: formData.get("procedure_id"),
      clerk_id: formData.get("clerk_id"),
      notes: formData.get("notes"),
      treatment_timelines: formData.get("treatment_timelines"),
      pain_level: formData.get("pain_level"),
      diagnosis_status: formData.get("diagnosis_status"),
    } as Record<string, unknown>;

    const parsed = createDesiredProcedureSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const clerkId = parsed.data.clerk_id;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerkId))
      .limit(1)
      .then((res) => res[0]);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const newProcedure: NewDesiredProcedure = {
      user_id: user.id,
      clerk_id: clerkId,
      notes: parsed.data.notes ?? undefined,
      procedure_id: parsed.data.procedure_id,
      treatment_timeline: parsed.data.treatment_timelines ?? undefined,
      pain_level: parsed.data.pain_level ?? undefined,
      diagnosis_status: parsed.data.diagnosis_status ?? undefined,
    };

    await db.insert(desired_procedures).values(newProcedure).returning();

    // Revalidate any relevant paths or tags
    revalidateTag(`desired_procedures-${clerkId}`, "max");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Desired procedure added successfully!",
    };
  } catch (error) {
    console.error("Error creating desired procedure:", error);
    return {
      success: false,
      message: "Something went wrong while saving. Please try again.",
    };
  }
};
