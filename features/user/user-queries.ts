import "server-only";
import db from "@/drizzle/client";
import { doctor_requests, referring_physicians, users } from "@/drizzle/tables";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { cacheTag, cacheLife } from "next/cache";
import { unstable_rethrow } from "next/navigation";

type SerializableClerkUser = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: Array<{ id: string; emailAddress: string }>;
  phoneNumbers: Array<{ id: string; phoneNumber: string }>;
  primaryEmailAddressId: string | null;
  primaryPhoneNumberId: string | null;
  imageUrl: string;
  publicMetadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  lastSignInAt: string | null;
  banned: boolean;
  locked: boolean;
};

function serializeClerkUser(user: any): SerializableClerkUser {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map((e: any) => ({
      id: e.id,
      emailAddress: e.emailAddress,
    })),
    phoneNumbers: user.phoneNumbers.map((p: any) => ({
      id: p.id,
      phoneNumber: p.phoneNumber,
    })),
    primaryEmailAddressId: user.primaryEmailAddressId,
    primaryPhoneNumberId: user.primaryPhoneNumberId,
    imageUrl: user.imageUrl,
    publicMetadata: user.publicMetadata,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastSignInAt: user.lastSignInAt,
    banned: user.banned,
    locked: user.locked,
  };
}

export async function getCurrentUser() {
  "use cache: private";
  cacheTag("profile");
  cacheLife("minutes");

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
    unstable_rethrow(error);
    console.error("Error fetching current user:", error);
    throw new Error("Failed to fetch current user data");
  }
}

export async function getUserByClerkId(clerkId: string) {
  "use cache: private";
  cacheTag("profile");
  cacheLife("minutes");

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_id, clerkId))
      .limit(1);

    return user || null;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching user by clerk_id:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getUserByEmail(email: string) {
  "use cache: private";
  cacheTag("profile");
  cacheLife("minutes");

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user || null;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getUserById(id: number) {
  "use cache: private";
  cacheTag("profile");
  cacheLife("minutes");

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user || null;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching user by id:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getAllUsers() {
  "use cache";
  cacheTag("users");
  cacheLife("minutes");

  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(asc(users.createdAt));
    return allUsers;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getRecentUsers(limit: number = 5) {
  "use cache";
  cacheTag("users");
  cacheLife("minutes");

  try {
    const recentUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(limit);
    return recentUsers;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching recent users:", error);
    throw new Error("Failed to fetch user data");
  }
}

export async function getAllClerkUsers() {
  "use cache: private";
  cacheTag("clerk-users");
  cacheLife("minutes");

  const clerk = await clerkClient();
  const allClerkUsers = await clerk.users.getUserList({ limit: 100 });
  return {
    data: allClerkUsers.data.map(serializeClerkUser),
    totalCount: allClerkUsers.totalCount,
  };
}

export async function getDoctorUsersfromClerk() {
  "use cache: private";
  cacheTag("clerk-users");
  cacheLife("minutes");

  const clerk = await clerkClient();

  const allUsers = await clerk.users.getUserList({
    limit: 100,
  });

  const doctorUsers = allUsers.data.filter((user) => {
    return (user.publicMetadata as { role?: string })?.role === "doctor";
  });

  console.log(JSON.stringify(doctorUsers, null, 2));

  return {
    data: doctorUsers.map(serializeClerkUser),
    totalCount: doctorUsers.length,
  };
}

export async function getDoctorUsersWithReferringFlag() {
  "use cache: private";
  cacheTag("clerk-users");
  cacheLife("minutes");

  const clerk = await clerkClient();

  const allUsers = await clerk.users.getUserList({
    limit: 100,
  });

  const doctorUsers = allUsers.data.filter((user) => {
    return (user.publicMetadata as { role?: string })?.role === "doctor";
  });

  const clerkIds = doctorUsers.map((user) => user.id);

  if (clerkIds.length === 0) {
    return {
      data: doctorUsers.map((user) => ({ user: serializeClerkUser(user), isReferring: false })),
      totalCount: 0,
    };
  }

  const referringRows = await db
    .select({ clerk_id: referring_physicians.clerk_id })
    .from(referring_physicians)
    .where(inArray(referring_physicians.clerk_id, clerkIds));

  const referringSet = new Set(referringRows.map((row) => row.clerk_id));

  return {
    data: doctorUsers.map((user) => ({
      user: serializeClerkUser(user),
      isReferring: referringSet.has(user.id),
    })),
    totalCount: doctorUsers.length,
  };
}

export async function getDoctorUserByIdFromClerk(clerkId: string) {
  "use cache: private";
  cacheTag("clerk-users");
  cacheLife("minutes");

  const clerk = await clerkClient();
  try {
    const doctorUser = await clerk.users.getUser(clerkId);
    return serializeClerkUser(doctorUser);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching doctor user by clerk ID:", error);
    throw new Error("Failed to fetch doctor user data");
  }
}

export async function isDoctorReferringByClerkId(clerkId: string) {
  "use cache: private";
  cacheTag("referring-physicians");
  cacheLife("minutes");

  const [row] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, clerkId))
    .limit(1);

  return !!row;
}

export async function getPendingDoctorRequests() {
  "use cache: private";
  cacheTag("doctor-requests");
  cacheLife("minutes");

  try {
    const requests = await db
      .select({
        id: doctor_requests.id,
        clerk_id: doctor_requests.clerk_id,
        status: doctor_requests.status,
        created_at: doctor_requests.createdAt,
        user_first_name: users.first_name,
        user_last_name: users.last_name,
        user_email: users.email,
      })
      .from(doctor_requests)
      .innerJoin(users, eq(doctor_requests.clerk_id, users.clerk_id))
      .where(eq(doctor_requests.status, "pending"))
      .orderBy(desc(doctor_requests.createdAt));

    return requests;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching pending doctor requests:", error);
    throw new Error("Failed to fetch pending doctor requests");
  }
}

export async function getDoctorRequestByClerkId(clerkId: string) {
  "use cache: private";
  cacheTag("doctor-requests");
  cacheLife("minutes");

  try {
    const [request] = await db
      .select()
      .from(doctor_requests)
      .where(eq(doctor_requests.clerk_id, clerkId))
      .orderBy(desc(doctor_requests.createdAt))
      .limit(1);

    return request || null;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error fetching doctor request:", error);
    throw new Error("Failed to fetch doctor request");
  }
}

export async function getPendingDoctorRequestCount() {
  "use cache: private";
  cacheTag("doctor-requests");
  cacheLife("minutes");

  try {
    const result = await db
      .select({ count: doctor_requests.id })
      .from(doctor_requests)
      .where(eq(doctor_requests.status, "pending"));

    return result.length;
  } catch (error) {
    unstable_rethrow(error);
    console.error("Error counting pending doctor requests:", error);
    throw new Error("Failed to count pending doctor requests");
  }
}
