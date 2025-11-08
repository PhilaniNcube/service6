import { getAllClerkUsers } from "@/dal/queries/users";
import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getInitials = (firstName?: string | null, lastName?: string | null) => {
  if (!firstName && !lastName) return "NA";
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getRoleColor = (role: string) => {
  const colors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    admin: "destructive",
    doctor: "default",
    patient: "secondary",
    staff: "outline",
  };
  return colors[role.toLowerCase()] || "outline";
};

const ClerkUsers = async () => {
  const allClerkUsers = await getAllClerkUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle> Users</CardTitle>
        <CardDescription>
          All users registered in the system ({allClerkUsers.data.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Sign In</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allClerkUsers.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.imageUrl} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback>
                        {getInitials(user.firstName, user.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.username || 'No username'}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {user.emailAddresses[0]?.emailAddress || 'No email'}
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleColor(user.publicMetadata?.role as string || 'patient')}>
                    {(user.publicMetadata?.role as string || 'patient').charAt(0).toUpperCase() + (user.publicMetadata?.role as string || 'patient').slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastSignInAt ? formatDate(user.lastSignInAt) : 'Never'}
                </TableCell>
                <TableCell>
                  <Badge variant={user.banned ? "destructive" : "default"}>
                    {user.banned ? 'Banned' : 'Active'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/clients/${user.id}`}>
                      View Profile
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClerkUsers;
