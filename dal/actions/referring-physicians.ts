"use server";

import db from "@/drizzle/client";
import {
  referring_physicians,
  specialties,
  type ContactMethod,
} from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { AddReferringPhysicianState } from "./types";

const addReferringPhysicianSchema = z.object({
  user_id: z.coerce.number().int().positive("User is required"),
  clerk_id: z.string().min(1, "Clerk ID is required"),
  full_name: z.string().min(1, "Full name is required"),
  qualification: z.string().min(1, "Qualification is required"),
  specialty: z.coerce
    .number()
    .int()
    .positive("Specialty is required"),
  medical_practice: z.string().min(1, "Medical practice is required"),
  medical_council_number: z
    .string()
    .min(1, "Medical council number is required"),
  country_of_practice: z
    .string()
    .min(1, "Country of practice is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Valid email is required"),
  preferred_contact_method: z
    .enum(["email", "phone", "sms", "whatsapp", "video call"])
    .optional()
    .nullable(),
  alternative_contact_number: z.string().optional().nullable(),
});

export type AddReferringPhysicianInput = z.infer<
  typeof addReferringPhysicianSchema
>;

export async function addReferringPhysician(
  prevState: AddReferringPhysicianState,
  formData: FormData
): Promise<AddReferringPhysicianState> {
  try {
    const rawData = {
      user_id: formData.get("user_id"),
      clerk_id: formData.get("clerk_id") as string,
      full_name: formData.get("full_name") as string,
      qualification: formData.get("qualification") as string,
      specialty: formData.get("specialty"),
      medical_practice: formData.get("medical_practice") as string,
      medical_council_number: formData.get(
        "medical_council_number"
      ) as string,
      country_of_practice: formData.get("country_of_practice") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      preferred_contact_method: formData.get(
        "preferred_contact_method"
      ) as ContactMethod | null,
      alternative_contact_number: formData.get(
        "alternative_contact_number"
      ) as string | null,
    };

    const parsed = addReferringPhysicianSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: parsed.error.flatten().fieldErrors,
      };
    }

    const data = parsed.data;

    // Optional: verify specialty exists
    const [specialty] = await db
      .select()
      .from(specialties)
      .where(eq(specialties.id, data.specialty))
      .limit(1);

    if (!specialty) {
      return {
        success: false,
        message: "Selected specialty does not exist.",
        errors: { specialty: ["Invalid specialty selected"] },
      };
    }

    await db.insert(referring_physicians).values({
      user_id: data.user_id,
      clerk_id: data.clerk_id,
      full_name: data.full_name,
      qualification: data.qualification,
      specialty: data.specialty,
      medical_practice: data.medical_practice,
      medical_council_number: data.medical_council_number,
      country_of_practice: data.country_of_practice,
      phone: data.phone,
      email: data.email,
      preferred_contact_method: data.preferred_contact_method ?? null,
      alternative_contact_number: data.alternative_contact_number ?? null,
    });

    revalidatePath("/dashboard/doctors");

    return {
      success: true,
      message: "Referring physician added successfully!",
    };
  } catch (error) {
    console.error("Error adding referring physician:", error);
    return {
      success: false,
      message:
        "An error occurred while adding the referring physician. Please try again.",
    };
  }
}
