"use client";

import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMedicationSchema } from "@/lib/schemas";
import { addMedication } from "@/dal/actions/medications";
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

type FormData = z.infer<typeof addMedicationSchema>;

const AddMedicationForm = () => {
  const [state, formAction, isPending] = useActionState(addMedication, null);

  // Initialize react-hook-form
  const {
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(addMedicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      start_date: "",
      end_date: "",
    },
  });

  // Reset form on successful submission
  useEffect(() => {
    if (state?.success) {
      reset({
        name: "",
        dosage: "",
        frequency: "",
        start_date: "",
        end_date: "",
      });
    }
  }, [state?.success, reset]);

  // Sync server-side errors with react-hook-form
  useEffect(() => {
    if (state?.error) {
      if (typeof state.error === "string") {
        setError("name", {
          type: "server",
          message: state.error,
        });
      }
    }
  }, [state?.error, setError]);

  return (
    <div>
      <form action={formAction} className="space-y-6">
        {/* Medication Name field */}
        <Field>
          <FieldLabel htmlFor="name">Medication Name *</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Aspirin, Metformin"
              disabled={isPending}
              {...register("name")}
            />
            <FieldDescription>
              Enter the name of the medication
            </FieldDescription>
            <FieldError errors={[errors.name]} />
          </FieldContent>
        </Field>

        {/* Dosage field */}
        <Field>
          <FieldLabel htmlFor="dosage">Dosage *</FieldLabel>
          <FieldContent>
            <Input
              id="dosage"
              type="text"
              placeholder="e.g., 500mg, 10ml"
              disabled={isPending}
              {...register("dosage")}
            />
            <FieldDescription>
              Specify the dosage amount
            </FieldDescription>
            <FieldError errors={[errors.dosage]} />
          </FieldContent>
        </Field>

        {/* Frequency field */}
        <Field>
          <FieldLabel htmlFor="frequency">Frequency *</FieldLabel>
          <FieldContent>
            <Input
              id="frequency"
              type="text"
              placeholder="e.g., Twice daily, Once a week"
              disabled={isPending}
              {...register("frequency")}
            />
            <FieldDescription>
              How often do you take this medication?
            </FieldDescription>
            <FieldError errors={[errors.frequency]} />
          </FieldContent>
        </Field>

        {/* Start Date field */}
        <Field>
          <FieldLabel htmlFor="start_date">Start Date</FieldLabel>
          <FieldContent>
            <Input
              id="start_date"
              type="date"
              disabled={isPending}
              {...register("start_date")}
            />
            <FieldDescription>
              When did you start taking this medication? (Optional)
            </FieldDescription>
            <FieldError errors={[errors.start_date]} />
          </FieldContent>
        </Field>

        {/* End Date field */}
        <Field>
          <FieldLabel htmlFor="end_date">End Date</FieldLabel>
          <FieldContent>
            <Input
              id="end_date"
              type="date"
              disabled={isPending}
              {...register("end_date")}
            />
            <FieldDescription>
              When will you stop taking this medication? (Optional)
            </FieldDescription>
            <FieldError errors={[errors.end_date]} />
          </FieldContent>
        </Field>

        {/* Status messages */}
        {state?.success && (
          <Alert variant="default">
            <AlertDescription>
              Medication added successfully!
            </AlertDescription>
          </Alert>
        )}

        {state?.error && !errors.name && (
          <Alert variant="destructive">
            <AlertDescription>
              {typeof state.error === "string" ? state.error : "An error occurred"}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Medication...
            </>
          ) : (
            "Add Medication"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddMedicationForm;

  