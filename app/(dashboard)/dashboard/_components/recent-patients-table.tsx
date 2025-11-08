import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Placeholder data matching the users table schema
const recentPatients = [
  {
    id: 1,
    clerk_id: "user_2abc123",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "sarah.johnson@email.com",
    phone_number: "+1-555-0123",
    country: "USA",
    preferred_contact_method: "email",
    next_of_kin_name: "Michael Johnson",
    next_of_kin_contact: "+1-555-0124",
    createdAt: new Date("2024-11-05"),
  },
  {
    id: 2,
    clerk_id: "user_3def456",
    first_name: "James",
    last_name: "Williams",
    email: "james.williams@email.com",
    phone_number: "+44-20-1234-5678",
    country: "UK",
    preferred_contact_method: "phone",
    next_of_kin_name: "Emma Williams",
    next_of_kin_contact: "+44-20-1234-5679",
    createdAt: new Date("2024-11-06"),
  },
  {
    id: 3,
    clerk_id: "user_4ghi789",
    first_name: "Maria",
    last_name: "Garcia",
    email: "maria.garcia@email.com",
    phone_number: "+34-91-123-4567",
    country: "Spain",
    preferred_contact_method: "whatsapp",
    next_of_kin_name: "Carlos Garcia",
    next_of_kin_contact: "+34-91-123-4568",
    createdAt: new Date("2024-11-07"),
  },
  {
    id: 4,
    clerk_id: "user_5jkl012",
    first_name: "David",
    last_name: "Chen",
    email: "david.chen@email.com",
    phone_number: "+86-10-1234-5678",
    country: "China",
    preferred_contact_method: "video call",
    next_of_kin_name: "Linda Chen",
    next_of_kin_contact: "+86-10-1234-5679",
    createdAt: new Date("2024-11-07"),
  },
  {
    id: 5,
    clerk_id: "user_6mno345",
    first_name: "Emma",
    last_name: "Brown",
    email: "emma.brown@email.com",
    phone_number: "+61-2-9876-5432",
    country: "Australia",
    preferred_contact_method: "sms",
    next_of_kin_name: "Oliver Brown",
    next_of_kin_contact: "+61-2-9876-5433",
    createdAt: new Date("2024-11-08"),
  },
]

const getInitials = (firstName?: string | null, lastName?: string | null) => {
  if (!firstName && !lastName) return "NA"
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
}

const getContactMethodColor = (method: string) => {
  const colors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    email: "default",
    phone: "secondary",
    sms: "outline",
    whatsapp: "default",
    "video call": "secondary",
  }
  return colors[method] || "default"
}

export function RecentPatientsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
        <CardDescription>
          Latest patient registrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Preferred Method</TableHead>
              <TableHead>Registered</TableHead>
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
                  <Badge variant={getContactMethodColor(patient.preferred_contact_method)}>
                    {patient.preferred_contact_method}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {patient.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
