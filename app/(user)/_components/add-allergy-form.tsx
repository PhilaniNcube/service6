"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAllergySchema } from "@/lib/schemas";
import { addAllergyAction } from "@/dal/actions/allergies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { z } from "zod";
import { useClerk } from "@clerk/nextjs";

type FormData = z.infer<typeof addAllergySchema>;

const AddAllergyForm = () => {
  const { user } = useClerk();

  const clerkId = user?.id || "";

  const initialState = {
    success: false,
    error: undefined,
  };

  const [state, formAction, isPending] = useActionState(
    addAllergyAction,
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
    resolver: zodResolver(addAllergySchema),
    defaultValues: {
      clerkId: clerkId,
      allergy: "",
    },
  });

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      reset({
        clerkId: clerkId,
        allergy: "",
      });
    }
  }, [state.success, reset, clerkId]);

  // Sync server-side errors with react-hook-form
  useEffect(() => {
    if (state.error) {
      setError("allergy", {
        type: "server",
        message: state.error,
      });
    }
  }, [state.error, setError]);

  // Handle form submission
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("clerkId", data.clerkId);
    formData.append("allergy", data.allergy);
    startTransition(() => {
      formAction(formData);
    });
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Hidden field for clerkId */}
        <input type="hidden" {...register("clerkId")} />

        {/* Allergy field */}
        <Field>
          <FieldLabel htmlFor="allergy">Allergy Name *</FieldLabel>
          <FieldContent>
            <Input
              id="allergy"
              type="text"
              placeholder="Enter allergy name (e.g., Penicillin, Peanuts)"
              disabled={isPending}
              {...register("allergy")}
            />
            <FieldDescription>
              Please provide the name of the allergy
            </FieldDescription>
            <FieldError errors={[errors.allergy]} />
          </FieldContent>
        </Field>

        {/* Status messages */}
        {state.success && (
          <Alert variant="default">
            <AlertDescription>Allergy added successfully!</AlertDescription>
          </Alert>
        )}

        {state.error && !errors.allergy && (
          <Alert variant="destructive">
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Allergy...
            </>
          ) : (
            "Add Allergy"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddAllergyForm;
