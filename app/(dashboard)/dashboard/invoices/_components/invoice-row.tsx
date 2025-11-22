"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface InvoiceRowProps {
  id: number;
  status: string;
  date: string;
  amount: number;
  currency: string | null;
  patientName: string;
}

export function InvoiceRow({
  id,
  status,
  date,
  amount,
  currency,
  patientName,
}: InvoiceRowProps) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer hover:bg-muted/50"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={() => router.push(`/dashboard/invoices/${id}` as any)}
    >
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell>{patientName}</TableCell>
      <TableCell>
        <Badge variant={status === "paid" ? "default" : "secondary"}>
          {status}
        </Badge>
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell className="text-right">
        {new Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: currency || "ZAR",
        }).format(amount / 100)}
      </TableCell>
    </TableRow>
  );
}
