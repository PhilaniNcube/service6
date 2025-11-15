"use server";

import db from "@/drizzle/client";
import { appointments } from "@/drizzle/tables";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type CreateAppointmentState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const createAppointmentSchema = z.object({
  patient_id: z
    .string()
    .min(1, "Patient is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid patient",
    }),
  patient_case_id: z
    .string()
    .min(1, "Case is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid case",
    }),
  referring_physician_id: z
    .string()
    .min(1, "Referring physician is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid referring physician",
    }),
  scheduled_at: z
    .string()
    .min(1, "Scheduled date and time is required")
    .transform((val) => new Date(val)),
  notes: z.string().optional().nullable(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export async function createAppointment(
  prevState: CreateAppointmentState,
  formData: FormData
): Promise<CreateAppointmentState> {
  try {
    const rawData = {
      patient_id: formData.get("patient_id") as string,
      patient_case_id: formData.get("patient_case_id") as string,
      referring_physician_id: formData.get("referring_physician_id") as string,
      scheduled_at: formData.get("scheduled_at") as string,
      notes: (formData.get("notes") as string) || undefined,
    };

    const validated = createAppointmentSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const {
      patient_id,
      patient_case_id,
      referring_physician_id,
      scheduled_at,
      notes,
    } = validated.data;

    await db.insert(appointments).values({
      patient_id,
      patient_case_id,
      referring_physician_id,
      scheduled_at,
      notes,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Appointment created successfully.",
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return {
      success: false,
      message: "An error occurred while creating the appointment.",
    };
  }
}
