"use client";

import { useActionState, useState } from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addReferringPhysician } from "@/dal/actions";
import type { AddReferringPhysicianState } from "@/dal/actions/types";
import type { ContactMethod, Specialty, User } from "@/drizzle/tables";

interface AddReferringPhysicianFormProps {
  users: User[];
  specialties: Specialty[];
}

const initialState: AddReferringPhysicianState = {
  success: false,
  message: "",
};

export function AddReferringPhysicianForm({
  users,
  specialties,
}: AddReferringPhysicianFormProps) {
  const [state, formAction, pending] = useActionState(
    addReferringPhysician,
    initialState
  );

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("");
  const [preferredContactMethod, setPreferredContactMethod] =
    useState<ContactMethod | "">("");
  const [clerkId, setClerkId] = useState<string>("");

  return (
    <div className="max-w-3xl rounded-lg border bg-card p-6 shadow-sm">
      {state.message && (
        <div
          className={`mb-4 rounded-md border px-3 py-2 text-sm ${
            state.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="user_id">User</FieldLabel>
          <input type="hidden" name="user_id" value={selectedUserId} />
          <input type="hidden" name="clerk_id" value={clerkId} />
          <Select
            value={selectedUserId}
            onValueChange={(value) => {
              setSelectedUserId(value);
              const user = users.find((u) => String(u.id) === value);
              if (user) {
                setClerkId(user.clerk_id);
              }
            }}
            disabled={pending}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.first_name} {user.last_name} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>
            Select the user this physician refers patients for.
          </FieldDescription>
          <FieldError>
            {state.errors?.user_id?.join(", ")}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="full_name">Full name</FieldLabel>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Dr Jane Doe"
            disabled={pending}
            aria-invalid={!!state.errors?.full_name?.length}
          />
          <FieldError>
            {state.errors?.full_name?.join(", ")}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
          <Input
            id="qualification"
            name="qualification"
            placeholder="MBChB, FCS (SA) Ortho"
            disabled={pending}
            aria-invalid={!!state.errors?.qualification?.length}
          />
          <FieldError>
            {state.errors?.qualification?.join(", ")}
          </FieldError>
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
            <input
              type="hidden"
              name="specialty"
              value={selectedSpecialtyId}
            />
            <Select
              value={selectedSpecialtyId}
              onValueChange={setSelectedSpecialtyId}
              disabled={pending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.id} value={String(specialty.id)}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError>
              {state.errors?.specialty?.join(", ")}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="medical_practice">Medical practice</FieldLabel>
            <Input
              id="medical_practice"
              name="medical_practice"
              placeholder="Practice or hospital name"
              disabled={pending}
              aria-invalid={!!state.errors?.medical_practice?.length}
            />
            <FieldError>
              {state.errors?.medical_practice?.join(", ")}
            </FieldError>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="medical_council_number">
              Medical council number
            </FieldLabel>
            <Input
              id="medical_council_number"
              name="medical_council_number"
              placeholder="Registration number"
              disabled={pending}
              aria-invalid={!!state.errors?.medical_council_number?.length}
            />
            <FieldError>
              {state.errors?.medical_council_number?.join(", ")}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="country_of_practice">
              Country of practice
            </FieldLabel>
            <Input
              id="country_of_practice"
              name="country_of_practice"
              placeholder="e.g. South Africa"
              disabled={pending}
              aria-invalid={!!state.errors?.country_of_practice?.length}
            />
            <FieldError>
              {state.errors?.country_of_practice?.join(", ")}
            </FieldError>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="phone">Phone number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              placeholder="Primary phone number"
              disabled={pending}
              aria-invalid={!!state.errors?.phone?.length}
            />
            <FieldError>{state.errors?.phone?.join(", ")}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              disabled={pending}
              aria-invalid={!!state.errors?.email?.length}
            />
            <FieldError>{state.errors?.email?.join(", ")}</FieldError>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="preferred_contact_method">
              Preferred contact method
            </FieldLabel>
            <input
              type="hidden"
              name="preferred_contact_method"
              value={preferredContactMethod}
            />
            <Select
              value={preferredContactMethod}
              onValueChange={(value) =>
                setPreferredContactMethod(value as ContactMethod)
              }
              disabled={pending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select contact method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="video call">Video call</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>
              How this physician prefers to be contacted.
            </FieldDescription>
            <FieldError>
              {state.errors?.preferred_contact_method?.join(", ")}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="alternative_contact_number">
              Alternative contact number
            </FieldLabel>
            <Input
              id="alternative_contact_number"
              name="alternative_contact_number"
              placeholder="Optional secondary number"
              disabled={pending}
              aria-invalid={!!state.errors?.alternative_contact_number?.length}
            />
            <FieldDescription>
              Optional backup number for urgent communication.
            </FieldDescription>
            <FieldError>
              {state.errors?.alternative_contact_number?.join(", ")}
            </FieldError>
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save referring physician"}
          </Button>
        </div>
      </form>
    </div>
  );
}
