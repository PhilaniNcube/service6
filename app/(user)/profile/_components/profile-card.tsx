import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { ProfileEditDialog } from "./profile-edit-dialog";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/dal";
import { redirect } from "next/navigation";
import { cacheLife } from "next/cache";

const ProfileCard = async () => {
    "use cache: private";
    cacheLife("minutes")
  // Get the current authenticated user from the DAL with caching
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </div>
        <ProfileEditDialog user={user} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              First Name
            </Label>
            <p className="text-lg">{user.first_name || "Not provided"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Last Name
            </Label>
            <p className="text-lg">{user.last_name || "Not provided"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Email
            </Label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Phone Number
            </Label>
            <p className="text-lg">{user.phone_number || "Not provided"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Country
            </Label>
            <p className="text-lg">{user.country || "Not provided"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Preferred Contact Method
            </Label>
            <p className="text-lg capitalize">
              {user.preferred_contact_method || "Not provided"}
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Next of Kin Name
            </Label>
            <p className="text-lg">{user.next_of_kin_name || "Not provided"}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-muted-foreground">
              Next of Kin Contact
            </Label>
            <p className="text-lg">
              {user.next_of_kin_contact || "Not provided"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
