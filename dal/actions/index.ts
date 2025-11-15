/**
 * Server Actions for Data Mutations
 * 
 * This directory contains all server actions for mutating data in the database.
 * All actions follow these principles:
 * 
 * 1. Use "use server" directive
 * 2. Accept FormData or typed parameters
 * 3. Validate input data using Zod schemas
 * 4. Return consistent state objects for useActionState
 * 5. Revalidate relevant paths after mutations
 * 6. Include proper error handling
 * 
 * Usage with useActionState:
 * ```typescript
 * const [state, formAction, pending] = useActionState(updateUserProfile, {
 *   success: false,
 *   message: "",
 * });
 * ```
 */

export * from "./users";
export * from "./referring-physicians";
export * from "./procedures";
export * from "./allergies";
export * from "./medications";
export * from "./past-surgeries";
export * from "./specialties";
export * from "./referrals";
export * from "./patients";
