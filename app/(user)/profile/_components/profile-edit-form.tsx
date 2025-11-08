"use client";

import { useActionState, useEffect } from "react";
import { updateUserProfile,  } from "@/dal/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { User } from "@/drizzle/tables";
import { Loader2 } from "lucide-react";
import { UpdateUserState } from "@/dal/actions/types";

interface ProfileEditFormProps {
  user: User;
  onSuccess?: () => void;
}

const initialState: UpdateUserState = {
  success: false,
  message: "",
};

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "video call", label: "Video Call" },
];

export function ProfileEditForm({ user, onSuccess }: ProfileEditFormProps) {
  const [state, formAction, pending] = useActionState(updateUserProfile, initialState);

  // Call onSuccess when form submission succeeds
  useEffect(() => {
    if (state.success && onSuccess) {
      // Add a small delay to show success message before closing
      const timeout = setTimeout(() => {
        onSuccess();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-6">
          {/* Hidden field for clerk_id */}
          <input type="hidden" name="clerk_id" value={user.clerk_id} />

          {/* Status Messages */}
          {state.message && (
            <div
              className={`rounded-md p-4 ${
                state.success
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400"
              }`}
            >
              {state.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <Field>
              <FieldLabel htmlFor="first_name">
                First Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                defaultValue={user.first_name || ""}
                required
                disabled={pending}
                aria-invalid={!!state.errors?.first_name}
              />
              {state.errors?.first_name && (
                <FieldError>
                  {state.errors.first_name.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Last Name */}
            <Field>
              <FieldLabel htmlFor="last_name">
                Last Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                defaultValue={user.last_name || ""}
                required
                disabled={pending}
                aria-invalid={!!state.errors?.last_name}
              />
              {state.errors?.last_name && (
                <FieldError>
                  {state.errors.last_name.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Phone Number */}
            <Field>
              <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                defaultValue={user.phone_number || ""}
                disabled={pending}
                placeholder="+1 (555) 000-0000"
                aria-invalid={!!state.errors?.phone_number}
              />
              {state.errors?.phone_number && (
                <FieldError>
                  {state.errors.phone_number.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Country */}
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                name="country"
                type="text"
                defaultValue={user.country || ""}
                disabled={pending}
                placeholder="e.g., United States"
                aria-invalid={!!state.errors?.country}
              />
              {state.errors?.country && (
                <FieldError>
                  {state.errors.country.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Preferred Contact Method */}
            <Field>
              <FieldLabel htmlFor="preferred_contact_method">
                Preferred Contact Method
              </FieldLabel>
              <Select
                name="preferred_contact_method"
                defaultValue={user.preferred_contact_method || ""}
                disabled={pending}
              >
                <SelectTrigger id="preferred_contact_method">
                  <SelectValue placeholder="Select a contact method" />
                </SelectTrigger>
                <SelectContent>
                  {contactMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.preferred_contact_method && (
                <FieldError>
                  {state.errors.preferred_contact_method.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Next of Kin Name */}
            <Field>
              <FieldLabel htmlFor="next_of_kin_name">Next of Kin Name</FieldLabel>
              <Input
                id="next_of_kin_name"
                name="next_of_kin_name"
                type="text"
                defaultValue={user.next_of_kin_name || ""}
                disabled={pending}
                aria-invalid={!!state.errors?.next_of_kin_name}
              />
              <FieldDescription>
                Emergency contact person
              </FieldDescription>
              {state.errors?.next_of_kin_name && (
                <FieldError>
                  {state.errors.next_of_kin_name.join(", ")}
                </FieldError>
              )}
            </Field>

            {/* Next of Kin Contact */}
            <Field>
              <FieldLabel htmlFor="next_of_kin_contact">
                Next of Kin Contact
              </FieldLabel>
              <Input
                id="next_of_kin_contact"
                name="next_of_kin_contact"
                type="text"
                defaultValue={user.next_of_kin_contact || ""}
                disabled={pending}
                placeholder="Phone or email"
                aria-invalid={!!state.errors?.next_of_kin_contact}
              />
              {state.errors?.next_of_kin_contact && (
                <FieldError>
                  {state.errors.next_of_kin_contact.join(", ")}
                </FieldError>
              )}
            </Field>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
  );
}
