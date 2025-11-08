import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getRecentUsers } from "@/dal/queries/users";
import Link from "next/link";

const getInitials = (firstName?: string | null, lastName?: string | null) => {
  if (!firstName && !lastName) return "NA";
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

const getContactMethodColor = (method: string | null) => {
  if (!method) return "default";
  const colors: Record<
    string,
    "default" | "secondary" | "outline" | "destructive"
  > = {
    email: "default",
    phone: "secondary",
    sms: "outline",
    whatsapp: "default",
    "video call": "secondary",
  };
  return colors[method] || "default";
};

export async function RecentPatientsTable() {
  const recentPatients = await getRecentUsers();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>Latest patient registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Preferred Method</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(patient.first_name, patient.last_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {patient.first_name} {patient.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {patient.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {patient.phone_number}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{patient.country}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getContactMethodColor(
                      patient.preferred_contact_method
                    )}
                  >
                    {patient.preferred_contact_method}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  <Link
                    href={`/dashboard/clients/${patient.clerk_id}`}
                    className="ml-2 text-blue-500"
                  >
                    View Profile
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
