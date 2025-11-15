"use server";

import db from "@/drizzle/client";
import { patient_cases } from "@/drizzle/tables";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type CreatePatientCaseState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const createPatientCaseSchema = z.object({
  patient_id: z
    .string()
    .min(1, "Patient is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid patient",
    }),
  diagnosis_name: z.string().min(1, "Diagnosis name is required"),
  icd_code: z.string().optional().nullable(),
  secondary_diagnoses: z.string().optional().nullable(),
  case_complexity: z.enum([
    "straightforward",
    "moderate",
    "complex",
    "highly complex",
  ]),
  referral_reason: z.enum([
    "procedure not available locally",
    "specialist expertise required",
    "cost considerations",
    "reduced waiting times",
    "patient preference",
    "second opinion",
    "complicated revision surgery",
    "other",
  ]),
  recommended_procedure: z.string().optional().nullable(),
  procedure_id: z
    .string()
    .min(1, "Procedure is required")
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "Invalid procedure",
    }),
  preferred_timeline: z.enum([
    "immediate",
    "within a month",
    "within 3 months",
    "within 6 months",
    "not sure",
    "researching",
  ]),
});

export type CreatePatientCaseInput = z.infer<typeof createPatientCaseSchema>;

export async function createPatientCase(
  prevState: CreatePatientCaseState,
  formData: FormData
): Promise<CreatePatientCaseState> {
  try {
    const rawData = {
      patient_id: formData.get("patient_id") as string,
      diagnosis_name: formData.get("diagnosis_name") as string,
      icd_code: (formData.get("icd_code") as string) || undefined,
      secondary_diagnoses:
        (formData.get("secondary_diagnoses") as string) || undefined,
      case_complexity: formData.get("case_complexity") as string,
      referral_reason: formData.get("referral_reason") as string,
      recommended_procedure:
        (formData.get("recommended_procedure") as string) || undefined,
      procedure_id: formData.get("procedure_id") as string,
      preferred_timeline: formData.get("preferred_timeline") as string,
    };

    const validated = createPatientCaseSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const {
      patient_id,
      diagnosis_name,
      icd_code,
      secondary_diagnoses,
      case_complexity,
      referral_reason,
      recommended_procedure,
      procedure_id,
      preferred_timeline,
    } = validated.data;

    await db.insert(patient_cases).values({
      patient_id,
      diagnosis_name,
      icd_code,
      secondary_diagnoses,
      case_complexity,
      referral_reason,
      recommended_procedure,
      procedure_id,
      preferred_timeline,
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Patient case created successfully.",
    };
  } catch (error) {
    console.error("Error creating patient case:", error);
    return {
      success: false,
      message: "An error occurred while creating the patient case.",
    };
  }
}
