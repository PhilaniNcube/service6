# Data Access Layer (DAL)

This directory contains all database query functions for the application. All DAL functions follow these principles:

## Principles

1. **Server-only**: All DAL files import `"server-only"` to prevent client-side imports
2. **Cached**: Use React's `cache()` for request-level memoization
3. **Type-safe**: Return types are inferred from Drizzle schema
4. **Error handling**: All functions catch and log errors appropriately
5. **Single responsibility**: Each file handles queries for a specific domain

## Structure

```
dal/
├── index.ts          # Re-exports all DAL functions
├── users.ts          # User-related queries
├── procedures.ts     # Procedure-related queries (example)
├── medications.ts    # Medication-related queries (example)
└── actions/          # Server actions for mutations
    ├── index.ts      # Re-exports all actions
    ├── users.ts      # User mutation actions
    └── ...           # Other mutation actions
```

## Usage

### Queries (Server Components/Server Actions)

Import DAL functions in server components or server actions:

```typescript
import { getUserByClerkId } from "@/dal/users";

export default async function MyServerComponent() {
  const user = await getUserByClerkId(clerkId);
  // ...
}
```

### Mutations (Client Components with useActionState)

Import server actions and use with `useActionState`:

```typescript
"use client";

import { useActionState } from "react";
import { updateUserProfile } from "@/dal/actions/users";

export function MyForm() {
  const [state, formAction, pending] = useActionState(updateUserProfile, {
    success: false,
    message: "",
  });

  return (
    <form action={formAction}>
      {/* form fields */}
    </form>
  );
}
```

## Adding New DAL Functions

When adding new database queries, follow this template:

```typescript
import "server-only";
import db from "@/drizzle/client";
import { your_table } from "@/drizzle/tables";
import { eq } from "drizzle-orm";
import { cache } from "react";

/**
 * Description of what this function does
 * @param param - Description of parameter
 * @returns Description of return value
 */
export const yourFunctionName = cache(async (param: string) => {
  try {
    const result = await db
      .select()
      .from(your_table)
      .where(eq(your_table.column, param));

    return result;
  } catch (error) {
    console.error("Error description:", error);
    throw new Error("User-friendly error message");
  }
});
```

## Available Functions

### User Queries (`dal/users.ts`)

- `getUserByClerkId(clerkId: string)` - Get user by Clerk ID
- `getUserByEmail(email: string)` - Get user by email
- `getUserById(id: number)` - Get user by database ID

### User Actions (`dal/actions/users.ts`)

- `updateUserProfile(prevState, formData)` - Update user profile information
  - Returns: `{ success: boolean, message: string, errors?: {...} }`
  - Use with `useActionState` hook in client components

## Adding New Server Actions

When adding new mutation actions, follow this template:

```typescript
"use server";

import db from "@/drizzle/client";
import { your_table } from "@/drizzle/tables";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define validation schema
const yourSchema = z.object({
  field: z.string().min(1, "Field is required"),
});

// Define state type
export type YourActionState = {
  success: boolean;
  message: string;
  errors?: {
    field?: string[];
  };
};

/**
 * Server action description
 * @param prevState - Previous state from useActionState
 * @param formData - Form data from the client
 * @returns State object with success status and message
 */
export async function yourAction(
  prevState: YourActionState,
  formData: FormData
): Promise<YourActionState> {
  try {
    // Extract and validate data
    const rawData = {
      field: formData.get("field") as string,
    };

    const validatedData = yourSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    // Perform mutation
    await db.insert(your_table).values(validatedData.data);

    // Revalidate affected paths
    revalidatePath("/your-path");

    return {
      success: true,
      message: "Action completed successfully!",
    };
  } catch (error) {
    console.error("Error in action:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
}
```

## Benefits

- **Performance**: Request-level caching prevents duplicate queries
- **Maintainability**: Centralized query logic
- **Type safety**: Full TypeScript support
- **Security**: Server-only execution prevents client-side data access
- **Testability**: Easy to mock and test
