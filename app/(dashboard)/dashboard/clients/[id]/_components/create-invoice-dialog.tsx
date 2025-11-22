"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { createInvoiceWithItems } from "@/dal/actions/invoices";
import { toast } from "sonner";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateInvoiceDialogProps {
  patientId: number;
}

export function CreateInvoiceDialog({ patientId }: CreateInvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { description: "", quantity: 1, unit_price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unit_price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: unknown) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce(
      (acc, item) => acc + item.quantity * item.unit_price,
      0
    );
  };

  async function action(prevState: unknown, formData: FormData) {
    const status = formData.get("status") as unknown;
    const notes = formData.get("notes") as string;
    const dueDateStr = formData.get("due_date") as string;

    const invoiceData = {
      patient_id: patientId,
      total_amount: Math.round(calculateTotal() * 100), // Convert to cents
      status: status as "draft" | "pending" | "paid" | "overdue" | "cancelled",
      currency: "ZAR",
      notes,
      due_date: dueDateStr ? new Date(dueDateStr) : undefined,
      items: items.map((item) => ({
        description: item.description,
        quantity: Number(item.quantity),
        unit_price: Math.round(Number(item.unit_price) * 100), // Convert to cents
      })),
    };

    const result = await createInvoiceWithItems(invoiceData);
    if (result.success) {
      setOpen(false);
      toast.success("Invoice created successfully");
      return { success: true, message: "Invoice created" };
    } else {
      toast.error(result.message);
      return {
        success: false,
        message: result.message,
        errors: result.errors,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    message: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Invoice</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for this client.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Status</FieldLabel>
              <FieldContent>
                <Select name="status" defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
              <FieldError errors={state.errors?.fieldErrors?.status?.map(e => ({ message: e }))} />
            </Field>

            <Field>
              <FieldLabel>Due Date</FieldLabel>
              <FieldContent>
                <Input type="date" name="due_date" />
              </FieldContent>
              <FieldError errors={state.errors?.fieldErrors?.due_date?.map(e => ({ message: e }))} />
            </Field>
          </div>

          <Field>
            <FieldLabel>Notes</FieldLabel>
            <FieldContent>
              <Textarea name="notes" placeholder="Invoice notes..." />
            </FieldContent>
            <FieldError errors={state.errors?.fieldErrors?.notes?.map(e => ({ message: e }))} />
          </Field>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Invoice Items</h4>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex items-end gap-2">
                <Field className="flex-1">
                  <FieldLabel className={index !== 0 ? "sr-only" : ""}>
                    Description
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      placeholder="Item description"
                    />
                  </FieldContent>
                </Field>

                <Field className="w-24">
                  <FieldLabel className={index !== 0 ? "sr-only" : ""}>
                    Qty
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                    />
                  </FieldContent>
                </Field>

                <Field className="w-32">
                  <FieldLabel className={index !== 0 ? "sr-only" : ""}>
                    Price
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) =>
                        updateItem(index, "unit_price", Number(e.target.value))
                      }
                    />
                  </FieldContent>
                </Field>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mb-0.5"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                }).format(calculateTotal())}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
