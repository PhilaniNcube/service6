import { getDoctorUsersfromClerk } from "@/dal/queries/users";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const DoctorsList = async () => {
  const doctors = await getDoctorUsersfromClerk();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Doctors</h2>
        <Badge variant="secondary">{doctors.data.length} Total</Badge>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No doctors found
                </TableCell>
              </TableRow>
            ) : (
              doctors.data.map((doctor) => {
                const email =
                  doctor.emailAddresses.find(
                    (e) => e.id === doctor.primaryEmailAddressId
                  )?.emailAddress || doctor.emailAddresses[0]?.emailAddress;
                const initials =
                  `${doctor.firstName?.[0] || ""}${
                    doctor.lastName?.[0] || ""
                  }`.toUpperCase() || "DR";

                return (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={doctor.imageUrl}
                            alt={`${doctor.firstName} ${doctor.lastName}`}
                          />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {doctor.firstName} {doctor.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {doctor.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={doctor.banned ? "destructive" : "default"}
                      >
                        {doctor.banned ? "Banned" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(doctor.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/doctors/${doctor.id}`}>View</Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DoctorsList;
