"use server";

import db from "@/drizzle/client";
import { patients, patient_cases, referring_physicians, users } from "@/drizzle/tables";
import { updateTag } from "next/cache";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export type SubmitReferralState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  patientId?: number;
  patientCaseId?: number;
};

const submitReferralSchema = z.object({
  patient_first_name: z.string().min(1, "First name is required"),
  patient_last_name: z.string().min(1, "Last name is required"),
  patient_email: z.string().email("Valid email is required"),
  patient_phone: z.string().optional().nullable(),
  patient_country: z.string().min(1, "Country is required"),
  patient_consent: z.enum(["written", "verbal", "pending", "emergency"]),
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
  procedure_id: z.coerce.number().int().positive("Procedure is required"),
  preferred_timeline: z.enum([
    "immediate",
    "within a month",
    "within 3 months",
    "within 6 months",
    "not sure",
    "researching",
  ]),
  notes: z.string().optional().nullable(),
});

export type SubmitReferralInput = z.infer<typeof submitReferralSchema>;

export async function submitReferral(
  prevState: SubmitReferralState,
  formData: FormData
): Promise<SubmitReferralState> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "You must be logged in to submit a referral.",
      };
    }

    const [referring] = await db
      .select({ id: referring_physicians.id })
      .from(referring_physicians)
      .where(eq(referring_physicians.clerk_id, userId))
      .limit(1);

    if (!referring) {
      return {
        success: false,
        message: "No referring physician profile found for your account.",
      };
    }

    const rawData = {
      patient_first_name: formData.get("patient_first_name") as string,
      patient_last_name: formData.get("patient_last_name") as string,
      patient_email: formData.get("patient_email") as string,
      patient_phone: (formData.get("patient_phone") as string) || null,
      patient_country: formData.get("patient_country") as string,
      patient_consent: formData.get("patient_consent") as string,
      diagnosis_name: formData.get("diagnosis_name") as string,
      icd_code: (formData.get("icd_code") as string) || null,
      secondary_diagnoses:
        (formData.get("secondary_diagnoses") as string) || null,
      case_complexity: formData.get("case_complexity") as string,
      referral_reason: formData.get("referral_reason") as string,
      recommended_procedure:
        (formData.get("recommended_procedure") as string) || null,
      procedure_id: formData.get("procedure_id") as string,
      preferred_timeline: formData.get("preferred_timeline") as string,
      notes: (formData.get("notes") as string) || null,
    };

    const validated = submitReferralSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const data = validated.data;

    const [userResult] = await db
      .insert(users)
      .values({
        clerk_id: `ref_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        email: data.patient_email,
        first_name: data.patient_first_name,
        last_name: data.patient_last_name,
        country: data.patient_country,
        phone_number: data.patient_phone,
      })
      .returning({ id: users.id });

    const [patientResult] = await db
      .insert(patients)
      .values({
        user_id: userResult.id,
        referring_physician_id: referring.id,
        patient_consent: data.patient_consent,
      })
      .returning({ id: patients.id });

    const [caseResult] = await db
      .insert(patient_cases)
      .values({
        patient_id: patientResult.id,
        diagnosis_name: data.diagnosis_name,
        icd_code: data.icd_code,
        secondary_diagnoses: data.secondary_diagnoses,
        case_complexity: data.case_complexity,
        referral_reason: data.referral_reason,
        recommended_procedure: data.recommended_procedure,
        procedure_id: data.procedure_id,
        preferred_timeline: data.preferred_timeline,
        status: "submitted",
      })
      .returning({ id: patient_cases.id });

    updateTag("referrals");

    return {
      success: true,
      message: "Referral submitted successfully.",
      patientId: patientResult.id,
      patientCaseId: caseResult.id,
    };
  } catch (error) {
    console.error("Error submitting referral:", error);
    return {
      success: false,
      message: "An error occurred while submitting the referral.",
    };
  }
}
