# Server Actions Implementation Guide

## Overview

This project uses React's `useActionState` hook with Next.js server actions for handling form submissions and data mutations. This approach provides:

- **Progressive Enhancement**: Forms work without JavaScript
- **Optimistic Updates**: Pending states for better UX
- **Type Safety**: Full TypeScript support with Zod validation
- **Server-side Validation**: Secure data validation on the server
- **Automatic Revalidation**: Cache invalidation after mutations

## Architecture

```
Client Component (Form)
    ↓ [FormData]
Server Action (Validation + DB Mutation)
    ↓ [State Object]
Client Component (Display Result)
```

## Example: User Profile Update

### 1. Server Action (`dal/actions/users.ts`)

```typescript
"use server";

export type UpdateUserState = {
  success: boolean;
  message: string;
  errors?: {
    field_name?: string[];
  };
};

export async function updateUserProfile(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  // Validate → Mutate → Revalidate → Return
}
```

### 2. Client Form Component

```typescript
"use client";

import { useActionState } from "react";
import { updateUserProfile } from "@/dal/actions/users";

export function ProfileEditForm({ user }) {
  const [state, formAction, pending] = useActionState(
    updateUserProfile,
    { success: false, message: "" }
  );

  return (
    <form action={formAction}>
      {/* Display state.message */}
      <Input name="first_name" defaultValue={user.first_name} />
      {/* Display state.errors?.first_name */}
      
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
```

### 3. Server Component (Page)

```typescript
import { ProfileEditForm } from "./_components/profile-edit-form";
import { getUserByClerkId } from "@/dal/users";

export default async function ProfilePage() {
  const user = await getUserByClerkId(clerkId);
  
  return <ProfileEditForm user={user} />;
}
```

## Key Patterns

### Form Field Pattern with Shadcn Field Component

```typescript
<Field>
  <FieldLabel htmlFor="field_name">
    Label <span className="text-destructive">*</span>
  </FieldLabel>
  <Input
    id="field_name"
    name="field_name"
    defaultValue={initialValue}
    disabled={pending}
    aria-invalid={!!state.errors?.field_name}
  />
  {state.errors?.field_name && (
    <FieldError>{state.errors.field_name.join(", ")}</FieldError>
  )}
  <FieldDescription>Helper text</FieldDescription>
</Field>
```

### Select Field with Hidden Input

For Select components that don't directly support the `name` attribute, use a hidden input:

```typescript
const [selectedValue, setSelectedValue] = useState(defaultValue);

<input type="hidden" name="field_name" value={selectedValue} />
<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Status Messages

```typescript
{state.message && (
  <div className={state.success ? "text-green-800 bg-green-50" : "text-red-800 bg-red-50"}>
    {state.message}
  </div>
)}
```

### Loading States

```typescript
<Button type="submit" disabled={pending}>
  {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {pending ? "Saving..." : "Save Changes"}
</Button>
```

## Validation with Zod

```typescript
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18+"),
  phone: z.string().optional().nullable(),
});

// In server action
const result = schema.safeParse(rawData);

if (!result.success) {
  return {
    success: false,
    message: "Validation failed",
    errors: result.error.flatten().fieldErrors,
  };
}
```

## Best Practices

1. **Always Validate on Server**: Never trust client input
2. **Use Zod for Validation**: Consistent schema validation
3. **Revalidate Paths**: Clear cache after mutations
4. **Handle Errors Gracefully**: Return user-friendly messages
5. **Show Pending States**: Disable form during submission
6. **Use defaultValue**: For controlled inputs with server data
7. **Type Your State**: Export state types from actions
8. **Log Errors**: Use console.error for debugging
9. **Return Consistent Structure**: Always return the same shape

## Security Considerations

- ✅ Server-side validation prevents tampering
- ✅ Zod schemas enforce data types and constraints
- ✅ Database errors don't expose sensitive info
- ✅ User authentication checked in server actions
- ✅ SQL injection prevented by Drizzle ORM

## Performance

- Request-level caching with `cache()`
- Automatic revalidation with `revalidatePath()`
- No client-side state management needed
- Progressive enhancement for better UX
- Optimistic updates via pending state
