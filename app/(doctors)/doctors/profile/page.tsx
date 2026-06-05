import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/drizzle/client";
import { referring_physicians, specialties } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { DoctorProfileForm } from "@/features/doctor/components/doctor-profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon } from "lucide-react";

export const metadata = {
  title: "My Profile | ApexMed Doctor Portal",
  description: "Manage your referring physician profile",
};

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const [referring] = await db
    .select()
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, userId))
    .limit(1);

  if (!referring) {
    redirect("/doctors");
  }

  const [specialty] = await db
    .select({ id: specialties.id, name: specialties.name })
    .from(specialties)
    .where(eq(specialties.id, referring.specialty))
    .limit(1);

  const allSpecialties = await db.select().from(specialties);

  const profile = {
    full_name: referring.full_name,
    qualification: referring.qualification,
    specialty_id: referring.specialty,
    specialty_name: specialty?.name || "",
    medical_practice: referring.medical_practice,
    medical_council_number: referring.medical_council_number,
    country_of_practice: referring.country_of_practice,
    phone: referring.phone,
    email: referring.email,
    preferred_contact_method: referring.preferred_contact_method,
    alternative_contact_number: referring.alternative_contact_number,
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your professional information and contact details
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Professional Profile</CardTitle>
              <CardDescription>
                Update your information to ensure accurate communication
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DoctorProfileForm profile={profile} specialties={allSpecialties} />
        </CardContent>
      </Card>
    </div>
  );
}
