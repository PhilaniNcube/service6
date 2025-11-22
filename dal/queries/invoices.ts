import "server-only";
import db from "@/drizzle/client";
import { invoice_items, invoices, patients, users } from "@/drizzle/tables";
import { count, desc, eq } from "drizzle-orm";
import { checkRole } from "@/lib/roles";
import { getCurrentUser } from "@/dal/queries/users";
import { cacheTag } from "next/cache";

export async function getAllInvoices(page = 1, limit = 10) {
  "use cache: private";
  cacheTag("invoices");
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const offset = (page - 1) * limit;

  const data = await db
    .select({
      invoice: invoices,
      patient: users,
    })
    .from(invoices)
    .innerJoin(patients, eq(invoices.patient_id, patients.id))
    .innerJoin(users, eq(patients.user_id, users.id))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(invoices.createdAt));

  const [countResult] = await db.select({ count: count() }).from(invoices);
  const total = countResult.count;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getInvoicesForPatient(
  patientId: number,
  page = 1,
  limit = 10
) {
  "use cache: private";
  cacheTag("invoices", `patient-invoices-${patientId}`);
  const isAdmin = await checkRole("admin");
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!isAdmin) {
    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, patientId))
      .limit(1);

    if (!patient || patient.user_id !== user.id) {
      throw new Error("Unauthorized");
    }
  }

  const offset = (page - 1) * limit;

  const data = await db
    .select()
    .from(invoices)
    .where(eq(invoices.patient_id, patientId))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(invoices.createdAt));

  const [countResult] = await db
    .select({ count: count() })
    .from(invoices)
    .where(eq(invoices.patient_id, patientId));
  const total = countResult.count;

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getInvoiceById(invoiceId: number) {
  "use cache";
  cacheTag("invoices", `invoice-${invoiceId}`);
  const isAdmin = await checkRole("admin");
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const [invoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    return null;
  }

  if (!isAdmin) {
    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, invoice.patient_id))
      .limit(1);

    if (!patient || patient.user_id !== user.id) {
      throw new Error("Unauthorized");
    }
  }

  const items = await db
    .select()
    .from(invoice_items)
    .where(eq(invoice_items.invoice_id, invoiceId));

  return { ...invoice, items };
}
