import { getDoctorUserByIdFromClerk, isDoctorReferringByClerkId } from "@/dal/queries/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Mail,
  Phone,
} from "lucide-react";

const DoctorOverview = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const doctor = await getDoctorUserByIdFromClerk(id);
  const isReferring = await isDoctorReferringByClerkId(id);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Doctor not found
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            The doctor you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const primaryEmail =
    doctor.emailAddresses.find((e) => e.id === doctor.primaryEmailAddressId)
      ?.emailAddress || doctor.emailAddresses[0]?.emailAddress;

  const primaryPhone =
    doctor.phoneNumbers.find((p) => p.id === doctor.primaryPhoneNumberId)
      ?.phoneNumber || doctor.phoneNumbers[0]?.phoneNumber;

  const initials =
    `${doctor.firstName?.[0] || ""}${doctor.lastName?.[0] || ""}`.toUpperCase() ||
    "DR";

  const role =
    (doctor.publicMetadata as { role?: string })?.role || "Not specified";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={doctor.imageUrl} alt={`${doctor.firstName} ${doctor.lastName}`} />
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold">
                    {doctor.firstName} {doctor.lastName}
                  </h1>
                  <Badge variant={doctor.banned ? "destructive" : "default"}>
                    {doctor.banned ? "Banned" : "Active"}
                  </Badge>
                  {doctor.locked && <Badge variant="outline">Locked</Badge>}
                  {isReferring && (
                    <Badge variant="outline">Referring Physician</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Role: {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {primaryEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{primaryEmail}</span>
                  </div>
                )}
                {primaryPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{primaryPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default DoctorOverview;
