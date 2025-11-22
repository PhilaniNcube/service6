import z from "zod";

export const addAllergySchema = z.object({
  allergy: z.string().min(1, "Allergy name is required"),
  clerkId: z.string().min(1, "Clerk ID is required"),
});

export const pastSurgeriesSchema = z.object({
  notes: z.string(),
  clerkId: z.string().min(1, "Clerk ID is required"),
});

export type AddMedicationSchema = z.infer<typeof addMedicationSchema>;
export const addMedicationSchema = z.object({
  // Add your medication schema fields here
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export const updateMedicationSchema = addMedicationSchema.extend({
  id: z.number().min(1, "Medication ID is required"),
});
export type UpdateMedicationSchema = z.infer<typeof updateMedicationSchema>;

export const invoiceStatusSchema = z.enum([
  "draft",
  "pending",
  "paid",
  "overdue",
  "cancelled",
]);

export const createInvoiceSchema = z.object({
  patient_id: z.number().min(1, "Patient ID is required"),
  patient_case_id: z.number().optional(),
  total_amount: z.number().min(0, "Total amount must be non-negative"),
  currency: z.string().default("ZAR"),
  status: invoiceStatusSchema,
  due_date: z.date().optional(),
  issued_at: z.date().optional(),
  paid_at: z.date().optional(),
  notes: z.string().optional(),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceSchema>;

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
  id: z.number().min(1, "Invoice ID is required"),
});

export type UpdateInvoiceSchema = z.infer<typeof updateInvoiceSchema>;

export const createInvoiceItemSchema = z.object({
  invoice_id: z.number().min(1, "Invoice ID is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit_price: z.number().min(0, "Unit price must be non-negative"),
});

export type CreateInvoiceItemSchema = z.infer<typeof createInvoiceItemSchema>;

export const updateInvoiceItemSchema = createInvoiceItemSchema
  .partial()
  .extend({
    id: z.number().min(1, "Invoice Item ID is required"),
  });

export type UpdateInvoiceItemSchema = z.infer<typeof updateInvoiceItemSchema>;
