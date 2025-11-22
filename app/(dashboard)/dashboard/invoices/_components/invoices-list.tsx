import { getAllInvoices } from "@/dal/queries/invoices";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceRow } from "./invoice-row";

export async function InvoicesList() {
  const { data: invoices } = await getAllInvoices();

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Issued Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(({ invoice, patient }) => (
          <InvoiceRow
            key={invoice.id}
            id={invoice.id}
            status={invoice.status}
            date={invoice.issued_at.toLocaleDateString()}
            amount={invoice.total_amount}
            currency={invoice.currency}
            patientName={`${patient.first_name} ${patient.last_name}`}
          />
        ))}
      </TableBody>
    </Table>
  );
}
