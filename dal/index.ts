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

export * from "./users";
