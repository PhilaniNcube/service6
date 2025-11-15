import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers, getDoctorUsersfromClerk } from "@/dal/queries/users";
import { specialties } from "@/drizzle/tables";
import db from "@/drizzle/client";
import { AddReferringPhysicianForm } from "./_components/add-referring-physician-form";

async function ReferringPhysicianFormWrapper() {
  const [allUsers, doctorClerkUsers, specialtyList] = await Promise.all([
    getAllUsers(),
    getDoctorUsersfromClerk(),
    db.select().from(specialties),
  ]);

  // Only keep DB users whose clerk_id corresponds to a Clerk user with role doctor
  const doctorUsers = allUsers.filter((user) =>
    doctorClerkUsers.data.some((clerkUser) => clerkUser.id === user.clerk_id)
  );

  return (
    <AddReferringPhysicianForm
      users={doctorUsers}
      specialties={specialtyList}
    />
  );
}

export default function ReferringPhysiciansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Add Referring Physician
        </h1>
        <p className="text-muted-foreground text-sm">
          Link a referring physician to an existing user and capture their
          professional details.
        </p>
      </div>
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <ReferringPhysicianFormWrapper />
      </Suspense>
    </div>
  );
}
