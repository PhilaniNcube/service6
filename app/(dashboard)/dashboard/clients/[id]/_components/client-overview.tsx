import { getUserByClerkId } from "@/dal/queries/users";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, User, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ClientOverviewProps {
  params: Promise<{ id: string }>;
}

export async function ClientOverview({ params }: ClientOverviewProps) {
  const resolvedParams = await params;
  const user = await getUserByClerkId(resolvedParams.id);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Client Not Found</CardTitle>
          <CardDescription>No client data available for this ID.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Client Information
        </CardTitle>
        <CardDescription>Personal details and contact information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-base">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p className="text-base">{user.phone_number || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <p className="text-base">{user.country || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preferred Contact Method</p>
                {user.preferred_contact_method ? (
                  <Badge variant="secondary" className="mt-1">
                    {user.preferred_contact_method}
                  </Badge>
                ) : (
                  <p className="text-base">Not specified</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                <p className="text-base">
                  {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {user.next_of_kin_name && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Next of Kin</p>
                <p className="text-base">{user.next_of_kin_name}</p>
              </div>
              {user.next_of_kin_contact && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Contact</p>
                  <p className="text-base">{user.next_of_kin_contact}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
