import { getUserByClerkId } from "@/dal/queries/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Fingerprint,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { format } from "date-fns";

const DoctorDetails = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) => {
  const params = await paramsPromise;
  const clerkId = params.id;

  const user = await getUserByClerkId(clerkId);
  const formatDate = (date?: Date | null) =>
    date ? format(new Date(date), "MMMM d, yyyy") : "Not available";
  const fullName =
    user && (user.first_name || user.last_name)
      ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
      : "Not provided";

  if (!user) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Doctor record unavailable</CardTitle>
          <CardDescription>
            No profile data found for this doctor in the internal database.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Profile Details
          </CardTitle>
          <CardDescription>
            Information synced from the medical CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Full name
              </dt>
              <dd className="text-base font-semibold">{fullName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Email address
              </dt>
              <dd className="flex items-center gap-2 text-base">
                <span className="">{user.email}</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Phone number
              </dt>
              <dd className="flex items-center gap-2 text-base">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone_number ?? "Not provided"}</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Country / Region
              </dt>
              <dd className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.country ?? "Not provided"}</span>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" /> Contact preferences
          </CardTitle>
          <CardDescription>
            Preferred outreach channels and emergency contacts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Preferred contact method
            </p>
            {user.preferred_contact_method ? (
              <Badge variant="secondary" className="mt-1 capitalize">
                {user.preferred_contact_method}
              </Badge>
            ) : (
              <p className="text-base">Not specified</p>
            )}
          </div>

          {(user.next_of_kin_name || user.next_of_kin_contact) && (
            <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Next of kin
                </p>
                <p className="text-base">
                  {user.next_of_kin_name ?? "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Emergency contact
                </p>
                <p className="text-base">
                  {user.next_of_kin_contact ?? "Not provided"}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" /> Account metadata
          </CardTitle>
          <CardDescription>
            Identifiers and lifecycle timestamps
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Clerk ID
            </p>
            <p className="text-sm font-mono break-all">{user.clerk_id}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Internal user ID
            </p>
            <p className="text-sm font-mono">#{user.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase text-muted-foreground">Created</p>
              <p className="text-base font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase text-muted-foreground">Updated</p>
              <p className="text-base font-medium">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDetails;
