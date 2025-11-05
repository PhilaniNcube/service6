"use client";

import React, { startTransition, useActionState, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { createDesiredProcedure, type CreateDesiredProcedureState } from "@/dal/actions/procedures";
import type { Procedure, TreatmentTimeline } from "@/drizzle/tables";
import { treatment_timelines } from "@/drizzle/tables";
import { useUser } from "@clerk/nextjs";

// Client-side schema mirroring server expectations
const formSchema = z.object({
  clerk_id: z.string().min(1, "Missing user id"),
  procedure_id: z.coerce.number().int().positive({ message: "Choose a procedure" }),
  notes: z.string().max(1000, "Max 1000 characters").optional().or(z.literal("")),
  treatment_timelines: z.enum(treatment_timelines as unknown as [TreatmentTimeline, ...TreatmentTimeline[]]).optional(),
  pain_level: z.coerce
    .number()
    .min(1, "Min 1")
    .max(10, "Max 10")
    .optional(),
  diagnosis_status: z.enum(["yes", "no", "awaiting"]).optional(),
});

export type DesiredProcedureFormValues = z.infer<typeof formSchema>;

export function DesiredProcedureForm({ procedures }: { procedures: Procedure[] }) {
  const { user, isLoaded } = useUser();
  const clerkId = user?.id ?? "";
  const initialState: CreateDesiredProcedureState = {
    success: false,
    message: "",
  };
  const [state, formAction, isPending] = useActionState<CreateDesiredProcedureState, FormData>(
    createDesiredProcedure,
    initialState
  );

  const defaultValues: DesiredProcedureFormValues = useMemo(
    () => ({
      clerk_id: clerkId,
      procedure_id: 0, // force user to choose; validated as positive
      notes: "",
      treatment_timelines: undefined,
      pain_level: undefined,
      diagnosis_status: undefined,
    }),
    [clerkId]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DesiredProcedureFormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<DesiredProcedureFormValues>,
    defaultValues,
  });

  // Keep a local state for slider because Slider returns number[]
  const watchedPain = watch("pain_level");
  const [pain, setPain] = useState<number>(watchedPain ?? 5);

  useEffect(() => {
    if (watchedPain == null) {
      setPain(5);
    } else {
      setPain(watchedPain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset form on successful creation (heuristic: inserted row has an id)
  useEffect(() => {
    // If server returned a row with id, consider it success
    if (state?.success) {
      reset({ ...defaultValues });
      setPain(5);
    }
  }, [state, reset, defaultValues]);

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData();
    fd.append("clerk_id", data.clerk_id);
    fd.append("procedure_id", String(data.procedure_id));
    if (data.notes) fd.append("notes", data.notes);
    if (data.treatment_timelines) fd.append("treatment_timelines", data.treatment_timelines);
    if (data.pain_level != null) fd.append("pain_level", String(data.pain_level));
    if (data.diagnosis_status) fd.append("diagnosis_status", data.diagnosis_status);

    startTransition(() => {
      formAction(fd);
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Hidden clerk id */}
      <input type="hidden" value={clerkId} {...register("clerk_id")} />

      {/* Procedure select */}
      <Field>
        <FieldLabel htmlFor="procedure_id">Procedure *</FieldLabel>
        <FieldContent>
          <Select
            disabled={isPending || !isLoaded || !clerkId}
            onValueChange={(val) => setValue("procedure_id", Number(val), { shouldValidate: true })}
          >
            <SelectTrigger id="procedure_id">
              <SelectValue placeholder="Select a procedure" />
            </SelectTrigger>
            <SelectContent>
              {procedures.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[errors.procedure_id]} />
        </FieldContent>
      </Field>

      {/* Treatment timeline */}
      <Field>
        <FieldLabel htmlFor="treatment_timelines">When are you considering this?</FieldLabel>
        <FieldContent>
          <Select disabled={isPending || !isLoaded || !clerkId} onValueChange={(val) => setValue("treatment_timelines", val as TreatmentTimeline)}>
            <SelectTrigger id="treatment_timelines">
              <SelectValue placeholder="Choose a timeline (optional)" />
            </SelectTrigger>
            <SelectContent>
              {treatment_timelines.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription>Optional</FieldDescription>
          <FieldError errors={[errors.treatment_timelines]} />
        </FieldContent>
      </Field>

      {/* Pain level */}
      <Field>
        <FieldLabel htmlFor="pain_level">Pain level (1–10)</FieldLabel>
        <FieldContent>
          <div className="flex items-center gap-4">
            <Slider
              id="pain_level"
              min={1}
              max={10}
              step={1}
              value={[pain ?? 5]}
              onValueChange={(vals) => {
                const v = vals[0] ?? 5;
                setPain(v);
                setValue("pain_level", v);
              }}
              disabled={isPending || !isLoaded || !clerkId}
              className="flex-1"
            />
            <Input
              type="number"
              min={1}
              max={10}
              value={pain ?? ""}
              onChange={(e) => {
                const v = Number(e.target.value);
                const clamped = Number.isFinite(v) ? Math.max(1, Math.min(10, v)) : undefined;
                if (clamped !== undefined) {
                  setPain(clamped);
                  setValue("pain_level", clamped);
                }
              }}
              className="w-20"
            />
          </div>
          <FieldDescription>Optional</FieldDescription>
          <FieldError errors={[errors.pain_level]} />
        </FieldContent>
      </Field>

      {/* Diagnosis status */}
      <Field>
        <FieldLabel htmlFor="diagnosis_status">Have you been diagnosed?</FieldLabel>
        <FieldContent>
          <Select disabled={isPending || !isLoaded || !clerkId} onValueChange={(val) => setValue("diagnosis_status", val as "yes" | "no" | "awaiting")}>
            <SelectTrigger id="diagnosis_status">
              <SelectValue placeholder="Select status (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="awaiting">Awaiting</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>Optional</FieldDescription>
          <FieldError errors={[errors.diagnosis_status]} />
        </FieldContent>
      </Field>

      {/* Notes */}
      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <FieldContent>
          <Textarea
            id="notes"
            rows={5}
            placeholder="Add any notes (symptoms, preferences, questions)..."
            disabled={isPending}
            {...register("notes")}
          />
          <FieldDescription>Optional, up to 1000 characters.</FieldDescription>
          <FieldError errors={[errors.notes]} />
        </FieldContent>
      </Field>

      {/* Status messages */}
      {state && !state.success && state.message && (
        <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <Button type="submit" disabled={isPending || !isLoaded || !clerkId} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Add Desired Procedure"
        )}
      </Button>
    </form>
  );
}
