"use client";

import type { User } from "@/drizzle/tables";
import React, { startTransition, useActionState, useEffect } from "react";
import {
  addMedicalBackground,
  type AddMedicalBackgroundState,
} from "@/dal/actions/users";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";

// Form validation schema
const formSchema = z.object({
  clerk_id: z.string().min(1, "Clerk ID is required"),
  notes: z
    .string()
    .min(10, "Notes must be at least 10 characters")
    .max(1000, "Notes must not exceed 1000 characters"),
});

type FormData = z.infer<typeof formSchema>;

const AddMedicalHistory = ({ profile }: { profile: User }) => {
  const initialState: AddMedicalBackgroundState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    addMedicalBackground,
    initialState
  );

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clerk_id: profile.clerk_id,
      notes: "",
    },
  });

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      reset();
    }
  }, [state.success, reset]);

  // Sync server-side errors with react-hook-form
  useEffect(() => {
    if (state.errors?.notes) {
      setError("notes", {
        type: "server",
        message: state.errors.notes[0],
      });
    }
  }, [state.errors, setError]);

  // Handle form submission
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("clerk_id", data.clerk_id);
    formData.append("notes", data.notes);
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Hidden field for clerk_id */}
        <input type="hidden" {...register("clerk_id")} />

        {/* Notes field */}
        <Field>
          <FieldLabel htmlFor="notes">Medical Notes *</FieldLabel>
          <FieldContent>
            <Textarea
              id="notes"
              placeholder="Enter detailed medical history notes..."
              rows={8}
              disabled={isPending}
              {...register("notes")}
            />
            <FieldDescription>
              Minimum 10 characters, maximum 1000 characters
            </FieldDescription>
            <FieldError errors={[errors.notes]} />
          </FieldContent>
        </Field>

        {/* Status messages */}
        {state.message && (
          <Alert variant={state.success ? "default" : "destructive"}>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Medical History"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddMedicalHistory;
