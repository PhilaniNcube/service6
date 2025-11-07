import z from "zod";

export const addAllergySchema = z.object({
  allergy: z.string().min(1, "Allergy name is required"),
  clerkId: z.string().min(1, "Clerk ID is required"),
});
