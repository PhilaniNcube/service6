import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileEditDialog } from "./profile-edit-dialog";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Users, Heart } from "lucide-react";
import { getCurrentUser } from "@/dal/queries/users";
import { UpdateRoleButton } from "./update-role-button";
import { getUserRole } from "@/lib/roles";
import Link from "next/link";

const ProfileCard = async () => {
  // Get the current authenticated user from the DAL with caching
  const user = await getCurrentUser();

  const role = await getUserRole();

  if (!user) {
    redirect("/");
  }

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() ||
    "U";

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-24 bg-linear-to-r from-primary via-accent to-secondary">
        <div className="absolute -bottom-10 left-6">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
            <AvatarFallback className="text-xl font-bold bg-linear-to-br from-primary to-accent text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardHeader className="pt-12 pb-4 px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">
                {user.first_name} {user.last_name}
              </CardTitle>
              {role === "doctor" && (
                <Link href="/doctors">
                  <Badge
                    variant="secondary"
                    className="bg-linear-to-r from-primary/10 to-accent/10 text-primary border-primary/20 text-xs"
                  >
                    Doctor
                  </Badge>
                </Link>
              )}
              {role === "client" && (
                <Badge
                  variant="secondary"
                  className="bg-linear-to-r from-primary/10 to-accent/10 text-primary border-primary/20 text-xs"
                >
                  Patient
                </Badge>
              )}
              {role === "admin" && (
                <Link href="/dashboard">
                  <Badge
                    variant="secondary"
                    className="bg-linear-to-r from-primary/10 to-accent/10 text-primary border-primary/20 text-xs"
                  >
                    Admin
                  </Badge>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </div>
          </div>
          <div className="flex gap-2">
            {role !== "doctor" && role !== "admin" && (
              <UpdateRoleButton clerkId={user.clerk_id} />
            )}
            <ProfileEditDialog user={user} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate font-medium">
              {user.phone_number || "No phone"}
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate font-medium">
              {user.country || "No country"}
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
            <Heart className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="capitalize font-medium">
              {user.preferred_contact_method || "No preference"}
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" /> Emergency Contact
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium">
                {user.next_of_kin_name || "Not provided"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Contact:</span>
              <span className="font-medium">
                {user.next_of_kin_contact || "Not provided"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
