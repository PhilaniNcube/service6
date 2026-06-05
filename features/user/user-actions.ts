"use server";

import db from "@/drizzle/client";
import { users, type ContactMethod, medical_background, doctor_requests } from "@/drizzle/tables";
import { eq, and } from "drizzle-orm";
import { updateTag } from "next/cache";
import { z } from "zod";
import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Roles } from "@/types/global";
import type {
  UpdateUserState,
  AddMedicalBackgroundState,
  RequestDoctorRoleState,
  ReviewDoctorRequestState,
} from "@/features/_shared/action-types";

// Validation schema for user update
const updateUserSchema = z.object({
  clerk_id: z.string().min(1, "Clerk ID is required"),
  first_name: z.string().min(1, "First name is required").max(100),
  last_name: z.string().min(1, "Last name is required").max(100),
  phone_number: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  preferred_contact_method: z
    .enum(["email", "phone", "sms", "whatsapp", "video call"])
    .optional()
    .nullable(),
  next_of_kin_name: z.string().optional().nullable(),
  next_of_kin_contact: z.string().optional().nullable(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

/**
 * Server action to update user profile
 * @param prevState - Previous state from useActionState
 * @param formData - Form data from the client
 * @returns State object with success status and message
 */
export async function updateUserProfile(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  try {
    // Extract and validate data
    const rawData = {
      clerk_id: formData.get("clerk_id") as string,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      phone_number: formData.get("phone_number") as string | null,
      country: formData.get("country") as string | null,
      preferred_contact_method: formData.get(
        "preferred_contact_method"
      ) as ContactMethod | null,
      next_of_kin_name: formData.get("next_of_kin_name") as string | null,
      next_of_kin_contact: formData.get("next_of_kin_contact") as string | null,
    };

    const validatedData = updateUserSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { clerk_id, ...updateData } = validatedData.data;

    // Check if user exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerk_id))
      .limit(1);

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Update user
    await db
      .update(users)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(users.clerk_id, clerk_id));

    updateTag("profile");

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      message:
        "An error occurred while updating your profile. Please try again.",
    };
  }
}

// Validation schema for medical background
const addMedicalBackgroundSchema = z.object({
  clerk_id: z.string().min(1, "Clerk ID is required"),
  notes: z.string().min(10, "Notes must be at least 10 characters").max(1000, "Notes must not exceed 1000 characters"),
});

export type AddMedicalBackgroundInput = z.infer<typeof addMedicalBackgroundSchema>;

/**
 * Server action to add medical background
 * @param prevState - Previous state from useActionState
 * @param formData - Form data from the client
 * @returns State object with success status and message
 */
export async function addMedicalBackground(
  prevState: AddMedicalBackgroundState,
  formData: FormData
): Promise<AddMedicalBackgroundState> {
  try {
    // Extract data from formData
    const clerk_id = formData.get("clerk_id") as string;
    const notes = formData.get("notes") as string;

    const rawData = {
      clerk_id,
      notes,
    };

    const validatedData = addMedicalBackgroundSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation failed. Please check your inputs.",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const { clerk_id: clerkId, notes: validatedNotes } = validatedData.data;

    // Get user by clerk_id
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerkId))
      .limit(1);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Insert medical background
    await db
      .insert(medical_background)
      .values({
        user_id: user.id,
        clerk_id: clerkId,
        notes: validatedNotes,
      })
      .returning();

    updateTag("medical-history");

    return {
      success: true,
      message: "Medical history added successfully!",
    };
  } catch (error) {
    console.error("Error adding medical background:", error);
    return {
      success: false,
      message:
        "An error occurred while adding your medical history. Please try again.",
    };
  }
}

/**
 * Server action to update user's Clerk role to doctor
 * @param prevState - Previous state from useActionState
 * @param formData - Form data from the client
 * @returns State object with success status and message
 */
export async function updateUserRoleToDoctor(
  prevState: RequestDoctorRoleState,
  formData: FormData
): Promise<RequestDoctorRoleState> {
  try {
    const clerk_id = formData.get("clerk_id") as string;

    if (!clerk_id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerk_id))
      .limit(1);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const [existingRequest] = await db
      .select()
      .from(doctor_requests)
      .where(
        and(
          eq(doctor_requests.clerk_id, clerk_id),
          eq(doctor_requests.status, "pending")
        )
      )
      .limit(1);

    if (existingRequest) {
      return {
        success: false,
        message: "You already have a pending request",
      };
    }

    await db.insert(doctor_requests).values({
      user_id: user.id,
      clerk_id,
      status: "pending",
    });

    updateTag("profile");
    updateTag("doctor-requests");

    return {
      success: true,
      message: "Your request to become a doctor has been submitted for approval.",
    };
  } catch (error) {
    console.error("Error requesting doctor role:", error);
    return {
      success: false,
      message:
        "An error occurred while submitting your request. Please try again.",
    };
  }
}

export async function approveDoctorRequest(
  prevState: ReviewDoctorRequestState,
  formData: FormData
): Promise<ReviewDoctorRequestState> {
  try {
    const request_id = formData.get("request_id") as string;

    if (!request_id) {
      return {
        success: false,
        message: "Request ID is required",
      };
    }

    const { sessionClaims } = await auth();
    const adminClerkId = sessionClaims?.sub;

    if (!adminClerkId || sessionClaims?.metadata?.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const [request] = await db
      .select()
      .from(doctor_requests)
      .where(eq(doctor_requests.id, Number(request_id)))
      .limit(1);

    if (!request) {
      return {
        success: false,
        message: "Request not found",
      };
    }

    if (request.status !== "pending") {
      return {
        success: false,
        message: "Request has already been reviewed",
      };
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(request.clerk_id, {
      publicMetadata: {
        role: "doctor" as Roles,
      },
    });

    await db
      .update(doctor_requests)
      .set({
        status: "approved",
        reviewed_by: adminClerkId,
        reviewed_at: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(doctor_requests.id, Number(request_id)));

    updateTag("doctor-requests");
    updateTag("check-role");

    return {
      success: true,
      message: "Doctor request approved successfully.",
    };
  } catch (error) {
    console.error("Error approving doctor request:", error);
    return {
      success: false,
      message:
        "An error occurred while approving the request. Please try again.",
    };
  }
}

export async function rejectDoctorRequest(
  prevState: ReviewDoctorRequestState,
  formData: FormData
): Promise<ReviewDoctorRequestState> {
  try {
    const request_id = formData.get("request_id") as string;

    if (!request_id) {
      return {
        success: false,
        message: "Request ID is required",
      };
    }

    const { sessionClaims } = await auth();
    const adminClerkId = sessionClaims?.sub;

    if (!adminClerkId || sessionClaims?.metadata?.role !== "admin") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const [request] = await db
      .select()
      .from(doctor_requests)
      .where(eq(doctor_requests.id, Number(request_id)))
      .limit(1);

    if (!request) {
      return {
        success: false,
        message: "Request not found",
      };
    }

    if (request.status !== "pending") {
      return {
        success: false,
        message: "Request has already been reviewed",
      };
    }

    await db
      .update(doctor_requests)
      .set({
        status: "rejected",
        reviewed_by: adminClerkId,
        reviewed_at: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(doctor_requests.id, Number(request_id)));

    updateTag("doctor-requests");

    return {
      success: true,
      message: "Doctor request rejected.",
    };
  } catch (error) {
    console.error("Error rejecting doctor request:", error);
    return {
      success: false,
      message:
        "An error occurred while rejecting the request. Please try again.",
    };
  }
}
