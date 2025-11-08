import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileEditDialog } from "./profile-edit-dialog";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, User, Users, Heart } from "lucide-react";
import { getCurrentUser } from "@/dal/queries/users";
import { UpdateRoleButton } from "./update-role-button";

const ProfileCard = async () => {

  // Get the current authenticated user from the DAL with caching
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() ||
    "U";

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-32 bg-linear-to-r from-primary via-accent to-secondary">
        <div className="absolute -bottom-16 left-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarFallback className="text-3xl font-bold bg-linear-to-br from-primary to-accent text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="pt-20 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-3xl">
                {user.first_name} {user.last_name}
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-linear-to-r from-primary/10 to-accent/10 text-primary border-primary/20"
              >
                Patient
              </Badge>
            </div>
            <CardDescription className="text-base">
              Your personal information and contact details
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <UpdateRoleButton clerkId={user.clerk_id} />
            <ProfileEditDialog user={user} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/10">
              <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </Label>
                <p className="text-base font-medium truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-accent/5 to-transparent border border-accent/10">
              <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </Label>
                <p className="text-base font-medium">
                  {user.phone_number || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-secondary/5 to-transparent border border-secondary/10">
              <MapPin className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Country
                </Label>
                <p className="text-base font-medium">
                  {user.country || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/10">
              <Heart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Preferred Contact
                </Label>
                <p className="text-base font-medium capitalize">
                  {user.preferred_contact_method || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-accent/5 to-transparent border border-accent/10">
              <User className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Next of Kin Name
                </Label>
                <p className="text-base font-medium">
                  {user.next_of_kin_name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-linear-to-br from-secondary/5 to-transparent border border-secondary/10">
              <Phone className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <Label className="text-sm font-medium text-muted-foreground">
                  Next of Kin Contact
                </Label>
                <p className="text-base font-medium">
                  {user.next_of_kin_contact || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
