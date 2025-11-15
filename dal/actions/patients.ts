"use server";

import db from "@/drizzle/client";
import { patients } from "@/drizzle/tables";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import type { CreatePatientState } from "./types";

const createPatientSchema = z.object({
  user_id: z
    .string()
    .min(1, "User is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid user",
    }),
  referring_physician_id: z
    .string()
    .min(1, "Referring physician is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid referring physician",
    }),
  patient_consent: z.enum(["written", "verbal", "pending", "emergency"]),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;

export async function createPatientForReferringPhysician(
  prevState: CreatePatientState,
  formData: FormData
): Promise<CreatePatientState> {
  try {
    const rawData = {
      user_id: formData.get("user_id") as string,
      referring_physician_id: formData.get("referring_physician_id") as string,
      patient_consent: formData.get("patient_consent") as string,
    };

    const validated = createPatientSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { user_id, referring_physician_id, patient_consent } = validated.data;

    await db.insert(patients).values({
      user_id,
      referring_physician_id,
      patient_consent,
    });

    revalidateTag("patients", "max");
    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Patient created successfully.",
    };
  } catch (error) {
    console.error("Error creating patient:", error);
    return {
      success: false,
      message: "An error occurred while creating the patient.",
    };
  }
}
