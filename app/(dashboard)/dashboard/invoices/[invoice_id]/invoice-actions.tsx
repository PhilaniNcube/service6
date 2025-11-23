import { getInvoiceById } from "@/dal/queries/invoices";
import { Button } from "@/components/ui/button";
import { InvoiceStatusDropdown } from "./invoice-status-dropdown";

export async function InvoiceActions({ params }: { params: Promise<{ invoice_id: string }> }) {
  const { invoice_id } = await params;
  const invoiceId = parseInt(invoice_id);
  
  if (isNaN(invoiceId)) {
    return null;
  }

  const invoice = await getInvoiceById(invoiceId);

  if (!invoice) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      <InvoiceStatusDropdown invoiceId={invoice.id} currentStatus={invoice.status} />
      
      {invoice.status === 'pending' && (
        <>
          <Button>Pay Invoice</Button>
          <Button variant="secondary">Request Payment</Button>
          <Button variant="outline">Mark as Overdue</Button>
          <Button variant="destructive">Cancel</Button>
        </>
      )}
      {invoice.status === 'paid' && (
        <Button variant="outline">Download Receipt</Button>
      )}
      {invoice.status === 'overdue' && (
        <>
          <Button variant="destructive">Send Reminder</Button>
          <Button variant="outline">Cancel</Button>
        </>
      )}
      <Button variant="outline">Print</Button>
    </div>
  );
}
