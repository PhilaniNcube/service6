import "server-only";
import db from "@/drizzle/client";
import { users } from "@/drizzle/tables";
import { eq, asc, desc } from "drizzle-orm";
import { cache } from "react";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { cacheTag } from "next/cache";

/**
 * Data Access Layer for User operations
 * All functions are cached and should only be used on the server
 */

/**
 * Get the current authenticated user from Clerk and fetch their profile from database
 * Uses "use cache" directive with cache tags for fine-grained revalidation
 * @returns The user object with Clerk ID or null if not authenticated
 */
export async function getCurrentUser() {
  "use cache: private";
  cacheTag("profile");

  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerkUser.id))
      .limit(1);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error("Failed to fetch current user data");
  }
}

/**
 * Get a user by their Clerk ID
 * @param clerkId - The Clerk user ID
 * @returns The user object or null if not found
 */
export const getUserByClerkId = async (clerkId: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerkId))
      .limit(1);

    return user || null;
  } catch (error) {
    console.error("Error fetching user by clerk_id:", error);
    throw new Error("Failed to fetch user data");
  }
};

/**
 * Get a user by their email address
 * @param email - The user's email
 * @returns The user object or null if not found
 */
export const getUserByEmail = cache(async (email: string) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user || null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user data");
  }
});

/**
 * Get a user by their database ID
 * @param id - The user's database ID
 * @returns The user object or null if not found
 */
export const getUserById = cache(async (id: number) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user || null;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw new Error("Failed to fetch user data");
  }
});

// fetch all users for the admin dashboard
export const getAllUsers = cache(async () => {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(asc(users.createdAt));
    return allUsers;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch user data");
  }
});

// fetch the most recent users for the admin dashboard
export const getRecentUsers = cache(async (limit: number = 5) => {
  try {
    const recentUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(limit);
    return recentUsers;
  } catch (error) {
    console.error("Error fetching recent users:", error);
    throw new Error("Failed to fetch user data");
  }
});

// fetch all users from clerk including their public metadata
export const getAllClerkUsers = cache(async () => {
  const clerk = await clerkClient();
  const allClerkUsers = await clerk.users.getUserList({ limit: 100 });
  return allClerkUsers;
});

export const getDoctorUsersfromClerk = cache(async () => {
  const clerk = await clerkClient();

  // Fetch all users - Clerk doesn't support filtering by public_metadata in the query parameter
  const allUsers = await clerk.users.getUserList({
    limit: 100,
  });

  // Filter users where publicMetadata.role === 'doctor'
  const doctorUsers = allUsers.data.filter((user) => {
    return (user.publicMetadata as { role?: string })?.role === "doctor";
  });

  console.log(JSON.stringify(doctorUsers, null, 2));

  // Return in the same format as getUserList (with data property)
  return {
    data: doctorUsers,
    totalCount: doctorUsers.length,
  };
});

// get the data for the doctor overview component
export const getDoctorUserByIdFromClerk = cache(async (clerkId: string) => {
  const clerk = await clerkClient();
  try {
    const doctorUser = await clerk.users.getUser(clerkId);
    return doctorUser;
  } catch (error) {
    console.error("Error fetching doctor user by clerk ID:", error);
    throw new Error("Failed to fetch doctor user data");
  }
});
