import { getInvoiceById } from "@/dal/queries/invoices";
import { PatientDetails } from "./patient-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceItem } from "@/drizzle/tables";

export async function InvoiceDetails({ params }: { params: Promise<{ invoice_id: string }> }) {
  const { invoice_id } = await params;
  const invoiceId = parseInt(invoice_id);
  
  if (isNaN(invoiceId)) {
    return <div>Invalid Invoice ID</div>;
  }

  const invoice = await getInvoiceById(invoiceId);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const formatMoney = (amount: number, currency: string = 'ZAR') => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: currency 
    }).format(amount / 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issued Date</p>
                <p>{new Date(invoice.issued_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p>{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="text-lg font-bold">{formatMoney(invoice.total_amount, invoice.currency || 'ZAR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <PatientDetails patientId={invoice.patient_id} />
      </div>
      
      {/* Invoice Items if available */}
      {invoice.items && invoice.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Quantity</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Unit Price</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {invoice.items.map((item: InvoiceItem) => (
                      <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">{item.description}</td>
                        <td className="p-4 align-middle text-right">{item.quantity}</td>
                        <td className="p-4 align-middle text-right">{formatMoney(item.unit_price, invoice.currency || 'ZAR')}</td>
                        <td className="p-4 align-middle text-right">{formatMoney(item.quantity * item.unit_price, invoice.currency || 'ZAR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
