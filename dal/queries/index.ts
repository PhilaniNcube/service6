/**
 * Data Access Layer (DAL)
 * 
 * This module provides a centralized way to access data from the database.
 * All DAL functions:
 * - Are server-only (cannot be imported in client components)
 * - Use React's cache() for request-level memoization
 * - Handle errors gracefully
 * - Return typed data based on Drizzle schema
 * 
 * Usage:
 * ```typescript
 * import { getUserByClerkId } from "@/dal/users";
 * 
 * const user = await getUserByClerkId(clerkId);
 * ```
 */
export * from "./procedures";
export * from "./users";
export * from "./allergies";
export * from "./medications";
export * from "./past_surgeries";
export * from "./medical-history";
export * from "./dashboard-medical-overview";
export * from "./specialties";
export * from "./patients";
export * from "./patient-cases";
export * from "./candidate-patients";
export * from "./patients";
export * from "./appointments";
export * from "./documents";


