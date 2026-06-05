import { auth } from "@clerk/nextjs/server";
import db from "@/drizzle/client";
import { referring_physicians } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { getInvoicesForReferringPhysician } from "@/features/invoice/invoice-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileTextIcon } from "lucide-react";

async function getDoctorInvoices() {
  const { userId } = await auth();

  if (!userId) return { invoices: [], referringId: null };

  const [referring] = await db
    .select({ id: referring_physicians.id })
    .from(referring_physicians)
    .where(eq(referring_physicians.clerk_id, userId))
    .limit(1);

  if (!referring) return { invoices: [], referringId: null };

  const invoices = await getInvoicesForReferringPhysician(referring.id);

  return { invoices, referringId: referring.id };
}

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "outline",
  pending: "secondary",
  paid: "default",
  overdue: "destructive",
  cancelled: "outline",
};

export default async function DoctorInvoicesPage() {
  const { invoices } = await getDoctorInvoices();

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Invoices</h1>
        <p className="text-muted-foreground">
          View invoices for your referred patients
        </p>
      </div>

      {invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileTextIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No invoices yet</h3>
            <p className="text-sm text-muted-foreground">
              Invoices for your referred patients will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>
              {invoices.length} invoice{invoices.length !== 1 ? "s" : ""} for your referred patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map(({ invoice, patient }) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">#{invoice.id}</TableCell>
                    <TableCell>
                      {patient.first_name} {patient.last_name}
                    </TableCell>
                    <TableCell>
                      {invoice.currency} {(invoice.total_amount / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[invoice.status] || "outline"} className="capitalize">
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.issued_at.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {invoice.due_date ? invoice.due_date.toLocaleDateString() : "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
