
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
