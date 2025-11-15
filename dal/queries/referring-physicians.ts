import "server-only";
import db from "@/drizzle/client";
import { referring_physicians, specialties } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getReferringPhysicianByClerkId = cache(async (clerkId: string) => {
  const [row] = await db
    .select({
      id: referring_physicians.id,
      full_name: referring_physicians.full_name,
      qualification: referring_physicians.qualification,
      specialty_id: referring_physicians.specialty,
      medical_practice: referring_physicians.medical_practice,
      medical_council_number: referring_physicians.medical_council_number,
      country_of_practice: referring_physicians.country_of_practice,
      phone: referring_physicians.phone,
      email: referring_physicians.email,
      preferred_contact_method: referring_physicians.preferred_contact_method,
      alternative_contact_number:
        referring_physicians.alternative_contact_number,
      createdAt: referring_physicians.createdAt,
    })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, clerkId))
    .limit(1);

  if (!row) return null;

  const [specialty] = await db
    .select({ id: specialties.id, name: specialties.name })
    .from(specialties)
    .where(eq(specialties.id, row.specialty_id))
    .limit(1);

  return {
    ...row,
    specialty_name: specialty?.name ?? "",
  };
});
