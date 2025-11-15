import { getDoctorUsersWithReferringFlag } from "@/dal/queries/users";
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
import { Route } from "next";

const DoctorsList = async () => {
  const doctors = await getDoctorUsersWithReferringFlag();

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
              <TableHead>Referring</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No doctors found
                </TableCell>
              </TableRow>
            ) : (
              doctors.data.map(({ user, isReferring }) => {
                const email =
                  user.emailAddresses.find(
                    (e) => e.id === user.primaryEmailAddressId
                  )?.emailAddress || user.emailAddresses[0]?.emailAddress;
                const initials =
                  `${user.firstName?.[0] || ""}${
                    user.lastName?.[0] || ""
                  }`.toUpperCase() || "DR";

                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={user.imageUrl}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {user.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={user.banned ? "destructive" : "default"}
                      >
                        {user.banned ? "Banned" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {isReferring ? (
                        <Badge variant="outline">Referring Physician</Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/doctors/${user.id}` as Route}>View</Link>
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
