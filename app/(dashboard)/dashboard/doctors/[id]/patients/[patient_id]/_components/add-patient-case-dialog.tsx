"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  createPatientCase,
  type CreatePatientCaseState,
} from "@/dal/actions/patient-cases";
import {
  createProcedure,
  type CreateProcedureState,
} from "@/dal/actions/procedures";
import type { TreatmentTimeline, Procedure } from "@/drizzle/tables";
import type { CaseComplexity } from "@/drizzle/tables";
import { Loader2, Plus } from "lucide-react";

const formSchema = z.object({
  diagnosis_name: z.string().min(1, "Diagnosis name is required"),
  icd_code: z.string().optional().nullable(),
  secondary_diagnoses: z.string().optional().nullable(),
  case_complexity: z.custom<CaseComplexity>(),
  referral_reason: z.string().min(1, "Referral reason is required"),
  recommended_procedure: z.string().optional().nullable(),
  procedure_id: z.string().min(1, "Procedure is required"),
  preferred_timeline: z.custom<TreatmentTimeline>(),
});

export type AddPatientCaseFormValues = z.infer<typeof formSchema>;

const initialState: CreatePatientCaseState = {
  success: false,
  message: "",
};

interface AddPatientCaseDialogProps {
  patientId: number;
  procedures: Procedure[];
}

export function AddPatientCaseDialog({
  patientId,
  procedures,
}: AddPatientCaseDialogProps) {
  const [state, formAction, pending] = useActionState(
    createPatientCase,
    initialState
  );
  const [procedureState, procedureAction, procedurePending] = useActionState<
    CreateProcedureState,
    FormData
  >(createProcedure, { success: false, message: "" });

  const [isAddingProcedure, setIsAddingProcedure] = useState(false);

  const form = useForm<AddPatientCaseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis_name: "",
      icd_code: "",
      secondary_diagnoses: "",
      case_complexity: "straightforward" as CaseComplexity,
      referral_reason: "procedure not available locally",
      recommended_procedure: "",
      procedure_id: "",
      preferred_timeline: "immediate" as TreatmentTimeline,
    },
  });

  const caseComplexity = form.watch("case_complexity");
  const preferredTimeline = form.watch("preferred_timeline");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" >
          <Plus className="mr-2 h-4 w-4" />
          Add Case
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Patient Case</DialogTitle>
        </DialogHeader>
        <form
          action={formAction}
          className="space-y-4"
          onSubmit={form.handleSubmit(() => {})}
        >
          <input type="hidden" name="patient_id" value={patientId} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="diagnosis_name">Diagnosis name</FieldLabel>
              <FieldContent>
                <Input
                  id="diagnosis_name"
                  {...form.register("diagnosis_name")}
                  name="diagnosis_name"
                  disabled={pending}
                />
                <FieldError
                  errors={[
                    ...(state.errors?.diagnosis_name || []).map((message) => ({
                      message,
                    })),
                  ]}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="icd_code">ICD code</FieldLabel>
              <FieldContent>
                <Input
                  id="icd_code"
                  {...form.register("icd_code")}
                  name="icd_code"
                  disabled={pending}
                />
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="secondary_diagnoses">
              Secondary diagnoses
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="secondary_diagnoses"
                {...form.register("secondary_diagnoses")}
                name="secondary_diagnoses"
                disabled={pending}
              />
              <FieldDescription>
                Optional. List any additional diagnoses or clinical notes.
              </FieldDescription>
            </FieldContent>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Case complexity</FieldLabel>
              <FieldContent>
                <input
                  type="hidden"
                  name="case_complexity"
                  value={caseComplexity}
                />
                <Select
                  value={caseComplexity}
                  onValueChange={(value) =>
                    form.setValue("case_complexity", value as CaseComplexity)
                  }
                  disabled={pending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="straightforward">
                      Straightforward
                    </SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="complex">Complex</SelectItem>
                    <SelectItem value="highly complex">
                      Highly complex
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Referral reason</FieldLabel>
              <FieldContent>
                <Select
                  defaultValue={form.watch("referral_reason")}
                  onValueChange={(value) =>
                    form.setValue("referral_reason", value)
                  }
                  disabled={pending}
                  name="referral_reason"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="procedure not available locally">
                      Procedure not available locally
                    </SelectItem>
                    <SelectItem value="specialist expertise required">
                      Specialist expertise required
                    </SelectItem>
                    <SelectItem value="cost considerations">
                      Cost considerations
                    </SelectItem>
                    <SelectItem value="reduced waiting times">
                      Reduced waiting times
                    </SelectItem>
                    <SelectItem value="patient preference">
                      Patient preference
                    </SelectItem>
                    <SelectItem value="second opinion">
                      Second opinion
                    </SelectItem>
                    <SelectItem value="complicated revision surgery">
                      Complicated revision surgery
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="recommended_procedure">
              Recommended procedure
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="recommended_procedure"
                {...form.register("recommended_procedure")}
                name="recommended_procedure"
                disabled={pending}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Procedure</FieldLabel>
            <FieldContent>
              <input
                type="hidden"
                name="procedure_id"
                value={form.watch("procedure_id")}
              />
              <Select
                value={form.watch("procedure_id")}
                onValueChange={(value) => form.setValue("procedure_id", value)}
                disabled={pending}
              >
                <SelectTrigger>
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
              <FieldError
                errors={[
                  ...(state.errors?.procedure_id || []).map((message) => ({
                    message,
                  })),
                ]}
              />
              <FieldDescription>
                Choose an existing procedure. If needed, you can add a new one
                below.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Or create a new procedure</FieldLabel>
            <FieldContent>
              <button
                type="button"
                className="text-xs underline underline-offset-4 text-muted-foreground mb-2"
                onClick={() => setIsAddingProcedure((v) => !v)}
              >
                {isAddingProcedure
                  ? "Hide new procedure form"
                  : "Add a new procedure"}
              </button>

              {isAddingProcedure && (
                <form
                  action={procedureAction}
                  className="space-y-3 rounded-md border bg-muted/40 p-3"
                >
                  <Field>
                    <FieldLabel htmlFor="procedure_name">Name</FieldLabel>
                    <FieldContent>
                      <Input
                        id="procedure_name"
                        name="procedure_name"
                        disabled={procedurePending}
                      />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="procedure_description">
                      Description
                    </FieldLabel>
                    <FieldContent>
                      <Textarea
                        id="procedure_description"
                        name="procedure_description"
                        disabled={procedurePending}
                      />
                    </FieldContent>
                  </Field>

                  {procedureState.message && (
                    <div
                      className={`text-xs rounded-md border px-2 py-1 ${
                        procedureState.success
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-red-50 text-red-800 border-red-200"
                      }`}
                    >
                      {procedureState.message}
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-1">
                    <Button
                      type="submit"
                      size="sm"
                      variant="outline"
                      disabled={procedurePending}
                    >
                      {procedurePending && (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      )}
                      Save procedure
                    </Button>
                  </div>
                </form>
              )}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Preferred timeline</FieldLabel>
            <FieldContent>
              <input
                type="hidden"
                name="preferred_timeline"
                value={preferredTimeline}
              />
              <Select
                value={preferredTimeline}
                onValueChange={(value) =>
                  form.setValue(
                    "preferred_timeline",
                    value as TreatmentTimeline
                  )
                }
                disabled={pending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="within a month">Within a month</SelectItem>
                  <SelectItem value="within 3 months">
                    Within 3 months
                  </SelectItem>
                  <SelectItem value="within 6 months">
                    Within 6 months
                  </SelectItem>
                  <SelectItem value="not sure">Not sure</SelectItem>
                  <SelectItem value="researching">Researching</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>

          {state.message && (
            <div
              className={`text-sm rounded-md border px-3 py-2 ${
                state.success
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-red-50 text-red-800 border-red-200"
              }`}
            >
              {state.message}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Saving..." : "Save case"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
