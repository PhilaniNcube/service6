"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pastSurgeriesSchema } from "@/lib/schemas";
import { addPastSurgery } from "@/dal/actions/past-surgeries";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

type FormData = z.infer<typeof pastSurgeriesSchema>;

interface AddPastSurgeryFormProps {
  clerkId: string;
}

const AddPastSurgeryForm = ({ clerkId }: AddPastSurgeryFormProps) => {
  const [isPending, setIsPending] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(pastSurgeriesSchema),
    defaultValues: {
      clerkId: clerkId,
      notes: "",
    },
  });

  // Reset form on successful submission
  useEffect(() => {
    if (submitSuccess) {
      reset({
        clerkId: clerkId,
        notes: "",
      });
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, reset, clerkId]);

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    setIsPending(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData();
    formData.append("clerkId", data.clerkId);
    formData.append("notes", data.notes);

    try {
      const result = await addPastSurgery(null, formData);
      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(typeof result.error === "string" ? result.error : "An error occurred");
      }
    } catch {
      setSubmitError("An error occurred while adding the surgery");
    } finally {
      setIsPending(false);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Hidden field for clerkId */}
        <input type="hidden" {...register("clerkId")} />

        {/* Notes field */}
        <Field>
          <FieldLabel htmlFor="notes">Surgery Details *</FieldLabel>
          <FieldContent>
            <Textarea
              id="notes"
              placeholder="Enter details about past surgery (e.g., Appendectomy in 2020, no complications)"
              rows={6}
              disabled={isPending}
              {...register("notes")}
            />
            <FieldDescription>
              Please provide details about the surgery including type, date, and any relevant information
            </FieldDescription>
            <FieldError errors={[errors.notes]} />
          </FieldContent>
        </Field>

        {/* Status messages */}
        {submitSuccess && (
          <Alert variant="default">
            <AlertDescription>
              Past surgery added successfully!
            </AlertDescription>
          </Alert>
        )}

        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Surgery...
            </>
          ) : (
            "Add Past Surgery"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddPastSurgeryForm;
