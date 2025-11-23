"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InvoiceStatus, invoice_statuses } from "@/drizzle/tables";
import { updateInvoiceStatus } from "@/dal/actions/invoices";
import { toast } from "sonner";

interface InvoiceStatusDropdownProps {
  invoiceId: number;
  currentStatus: InvoiceStatus;
}

export function InvoiceStatusDropdown({
  invoiceId,
  currentStatus,
}: InvoiceStatusDropdownProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleStatusChange = (value: string) => {
    const newStatus = value as InvoiceStatus;
    startTransition(async () => {
      const result = await updateInvoiceStatus(invoiceId, newStatus);
      if (result.success) {
        toast.success("Invoice status updated");
      } else {
        toast.error(result.message || "Failed to update invoice status");
      }
    });
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {invoice_statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
