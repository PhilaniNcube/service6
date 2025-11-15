"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPatientForReferringPhysician } from "@/dal/actions";
import type { CreatePatientState } from "@/dal/actions/types";
import type { getCandidatePatientsForReferrer } from "@/dal/queries";

const formSchema = z.object({
  user_id: z.string().min(1, "Please select a user"),
  patient_consent: z
    .enum(["written", "verbal", "pending", "emergency"], {
      message: "Please select a consent type",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type AddPatientDialogProps = {
  referringPhysicianId: number;
  candidates: Awaited<ReturnType<typeof getCandidatePatientsForReferrer>>;
};

const initialState: CreatePatientState = {
  success: false,
  message: "",
};

export function AddPatientDialog({
  referringPhysicianId,
  candidates,
}: AddPatientDialogProps) {
  const [state, formAction, pending] = useActionState(
    createPatientForReferringPhysician,
    initialState
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      patient_consent: "pending",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add patient to this physician</DialogTitle>
        </DialogHeader>
        <form
          action={(formData) => {
            form.clearErrors();
            formData.set("referring_physician_id", String(referringPhysicianId));
            formData.set("user_id", form.getValues("user_id"));
            formData.set("patient_consent", form.getValues("patient_consent"));
            formAction(formData);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="user_id" className="text-sm font-medium">
              User
            </label>
            <p className="text-sm text-muted-foreground">
              Select a user to create as a patient for this physician.
            </p>
            <Select
              defaultValue={form.getValues("user_id")}
              onValueChange={(value) => form.setValue("user_id", value)}
            >
              <SelectTrigger id="user_id" className="w-full">
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    <span className="flex flex-col text-left">
                      <span>
                        {`${user.first_name ?? ""} ${
                          user.last_name ?? ""
                        }`.trim() || `User #${user.id}`}
                      </span>
                      {user.email && (
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(form.formState.errors.user_id?.message ||
              state.errors?.user_id?.[0]) && (
              <p className="text-sm text-destructive">
                {form.formState.errors.user_id?.message ||
                  state.errors?.user_id?.[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="patient_consent" className="text-sm font-medium">
              Patient consent
            </label>
            <p className="text-sm text-muted-foreground">
              Specify the consent status for this referral.
            </p>
            <Select
              defaultValue={form.getValues("patient_consent")}
              onValueChange={(value) =>
                form.setValue("patient_consent", value as FormValues["patient_consent"])
              }
            >
              <SelectTrigger id="patient_consent">
                <SelectValue placeholder="Select consent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="written">Written</SelectItem>
                <SelectItem value="verbal">Verbal</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            {(form.formState.errors.patient_consent?.message ||
              state.errors?.patient_consent?.[0]) && (
              <p className="text-sm text-destructive">
                {form.formState.errors.patient_consent?.message ||
                  state.errors?.patient_consent?.[0]}
              </p>
            )}
          </div>

          {state.message && (
            <p
              className={
                state.success
                  ? "text-xs text-emerald-600"
                  : "text-xs text-destructive"
              }
            >
              {state.message}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Adding..." : "Add Patient"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
