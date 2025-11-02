"use server";

import db from "@/drizzle/client";
import { users, type ContactMethod } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema for user update
const updateUserSchema = z.object({
  clerk_id: z.string().min(1, "Clerk ID is required"),
  first_name: z.string().min(1, "First name is required").max(100),
  last_name: z.string().min(1, "Last name is required").max(100),
  phone_number: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  preferred_contact_method: z.enum(["email", "phone", "sms", "whatsapp", "video call"]).optional().nullable(),
  next_of_kin_name: z.string().optional().nullable(),
  next_of_kin_contact: z.string().optional().nullable(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// State type for useActionState
export type UpdateUserState = {
  success: boolean;
  message: string;
  errors?: {
    first_name?: string[];
    last_name?: string[];
    phone_number?: string[];
    country?: string[];
    preferred_contact_method?: string[];
    next_of_kin_name?: string[];
    next_of_kin_contact?: string[];
  };
};

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
      preferred_contact_method: formData.get("preferred_contact_method") as ContactMethod | null,
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

    // Revalidate the profile page and the current-user cache
    revalidatePath("/profile");
    // Note: In Next.js 16 with "use cache", revalidateTag requires the cache scope
    // For now, we revalidate the entire path which will refresh the cached data
    revalidatePath("/", "layout");

    return {
      success: true,
      message: "Profile updated successfully!",
    };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      message: "An error occurred while updating your profile. Please try again.",
    };
  }
}
