"use server";

import db from "@/drizzle/client";
import { invoice_items, invoices } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { checkRole } from "@/lib/roles";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
  CreateInvoiceItemSchema,
  UpdateInvoiceItemSchema,
} from "@/lib/schemas";
import { revalidateTag } from "next/cache";

export async function createInvoice(data: CreateInvoiceSchema) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    const validated = createInvoiceSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: "Invalid data", errors: validated.error.flatten() };
    }

    const [newInvoice] = await db
      .insert(invoices)
      .values(validated.data)
      .returning();

    revalidateTag("invoices", "max");
    revalidateTag(`patient-invoices-${validated.data.patient_id}`, "max");

    return { success: true, data: newInvoice };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return { success: false, message: "Failed to create invoice" };
  }
}

export async function updateInvoice(data: UpdateInvoiceSchema) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    const validated = updateInvoiceSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: "Invalid data", errors: validated.error.flatten() };
    }

    const { id, ...updateData } = validated.data;

    const [updatedInvoice] = await db
      .update(invoices)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();

    revalidateTag("invoices", "max");
    revalidateTag(`invoice-${id}`, "max");
    if (updatedInvoice.patient_id) {
      revalidateTag(`patient-invoices-${updatedInvoice.patient_id}`, "max");
    }

    return { success: true, data: updatedInvoice };
  } catch (error) {
    console.error("Error updating invoice:", error);
    return { success: false, message: "Failed to update invoice" };
  }
}

export async function deleteInvoice(id: number) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    // First delete associated items
    await db.delete(invoice_items).where(eq(invoice_items.invoice_id, id));

    const [deletedInvoice] = await db
      .delete(invoices)
      .where(eq(invoices.id, id))
      .returning();

    revalidateTag("invoices", "max");
    revalidateTag(`invoice-${id}`, "max");
    if (deletedInvoice?.patient_id) {
      revalidateTag(`patient-invoices-${deletedInvoice.patient_id}`, "max");
    }

    return { success: true, data: deletedInvoice };
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return { success: false, message: "Failed to delete invoice" };
  }
}

export async function createInvoiceItem(data: CreateInvoiceItemSchema) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    const validated = createInvoiceItemSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: "Invalid data", errors: validated.error.flatten() };
    }

    const [newItem] = await db
      .insert(invoice_items)
      .values(validated.data)
      .returning();

    revalidateTag(`invoice-${validated.data.invoice_id}`, "max");

    return { success: true, data: newItem };
  } catch (error) {
    console.error("Error creating invoice item:", error);
    return { success: false, message: "Failed to create invoice item" };
  }
}

export async function updateInvoiceItem(data: UpdateInvoiceItemSchema) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    const validated = updateInvoiceItemSchema.safeParse(data);
    if (!validated.success) {
      return { success: false, message: "Invalid data", errors: validated.error.flatten() };
    }

    const { id, ...updateData } = validated.data;

    const [updatedItem] = await db
      .update(invoice_items)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(invoice_items.id, id))
      .returning();

    if (updatedItem) {
      revalidateTag(`invoice-${updatedItem.invoice_id}`, "max");
    }

    return { success: true, data: updatedItem };
  } catch (error) {
    console.error("Error updating invoice item:", error);
    return { success: false, message: "Failed to update invoice item" };
  }
}

export async function deleteInvoiceItem(id: number) {
  try {
    const isAdmin = await checkRole("admin");
    if (!isAdmin) {
      return { success: false, message: "Unauthorized" };
    }

    const [deletedItem] = await db
      .delete(invoice_items)
      .where(eq(invoice_items.id, id))
      .returning();

    if (deletedItem) {
      revalidateTag(`invoice-${deletedItem.invoice_id}`, "max");
    }

    return { success: true, data: deletedItem };
  } catch (error) {
    console.error("Error deleting invoice item:", error);
    return { success: false, message: "Failed to delete invoice item" };
  }
}
