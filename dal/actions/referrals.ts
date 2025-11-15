"use server";

import db from "@/drizzle/client";
import { desired_procedures } from "@/drizzle/tables";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import type { AddPatientToReferringPhysicianState } from "./types";

// Minimal schema for linking a patient to a referring physician.
// This assumes that higher-level flows handle choosing a procedure, etc.
const addPatientToReferringPhysicianSchema = z.object({
  patient_id: z
    .string()
    .min(1, "Patient is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid patient",
    }),
  referring_physician_id: z
    .string()
    .min(1, "Referring physician is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid referring physician",
    }),
});

export type AddPatientToReferringPhysicianInput = z.infer<
  typeof addPatientToReferringPhysicianSchema
>;

export async function addPatientToReferringPhysician(
  prevState: AddPatientToReferringPhysicianState,
  formData: FormData
): Promise<AddPatientToReferringPhysicianState> {
  try {
    const rawData = {
      patient_id: formData.get("patient_id") as string,
      referring_physician_id: formData.get("referring_physician_id") as string,
    };

    const validated = addPatientToReferringPhysicianSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { patient_id, referring_physician_id } = validated.data;

    // For now, we just create a placeholder desired_procedures row to link patient + referrer.
    await db.insert(desired_procedures).values({
      user_id: patient_id,
      clerk_id: "", // placeholder until a proper clerk mapping is defined
      procedure_id: 0, // placeholder; real procedure selection can be added later
      notes: `Referred by physician ${referring_physician_id}`,
    });

    revalidateTag("referrals", "max");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Patient linked to referring physician successfully.",
    };
  } catch (error) {
    console.error("Error adding patient to referring physician:", error);
    return {
      success: false,
      message:
        "An error occurred while adding the patient. Please try again.",
    };
  }
}
