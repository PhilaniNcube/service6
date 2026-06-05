"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { submitReferral, type SubmitReferralState } from "@/features/referral/referrals-actions";
import type { Procedure } from "@/drizzle/tables";
import { toast } from "sonner";

const initialState: SubmitReferralState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Submitting..." : "Submit Referral"}
    </Button>
  );
}

interface NewReferralFormProps {
  procedures: Procedure[];
  onSuccess?: () => void;
}

export function NewReferralForm({ procedures, onSuccess }: NewReferralFormProps) {
  const [state, formAction] = useActionState(submitReferral, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state.message && !state.success && state.errors === undefined) {
      toast.error(state.message);
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>
            Enter the patient&apos;s personal details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient_first_name">First Name *</Label>
              <Input
                id="patient_first_name"
                name="patient_first_name"
                required
                defaultValue={state.errors?.patient_first_name?.[0] ? "" : undefined}
              />
              {state.errors?.patient_first_name && (
                <p className="text-sm text-destructive">
                  {state.errors.patient_first_name[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient_last_name">Last Name *</Label>
              <Input
                id="patient_last_name"
                name="patient_last_name"
                required
              />
              {state.errors?.patient_last_name && (
                <p className="text-sm text-destructive">
                  {state.errors.patient_last_name[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient_email">Email *</Label>
              <Input
                id="patient_email"
                name="patient_email"
                type="email"
                required
              />
              {state.errors?.patient_email && (
                <p className="text-sm text-destructive">
                  {state.errors.patient_email[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient_phone">Phone Number</Label>
              <Input
                id="patient_phone"
                name="patient_phone"
                type="tel"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient_country">Country *</Label>
              <Input
                id="patient_country"
                name="patient_country"
                required
                placeholder="e.g., Nigeria, Kenya, UAE"
              />
              {state.errors?.patient_country && (
                <p className="text-sm text-destructive">
                  {state.errors.patient_country[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient_consent">Patient Consent *</Label>
              <Select name="patient_consent" defaultValue="pending">
                <SelectTrigger id="patient_consent">
                  <SelectValue placeholder="Select consent status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="written">Written</SelectItem>
                  <SelectItem value="verbal">Verbal</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.patient_consent && (
                <p className="text-sm text-destructive">
                  {state.errors.patient_consent[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Information</CardTitle>
          <CardDescription>
            Provide details about the patient&apos;s condition and referral
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis_name">Primary Diagnosis *</Label>
            <Input
              id="diagnosis_name"
              name="diagnosis_name"
              required
              placeholder="e.g., Degenerative disc disease"
            />
            {state.errors?.diagnosis_name && (
              <p className="text-sm text-destructive">
                {state.errors.diagnosis_name[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icd_code">ICD Code</Label>
              <Input
                id="icd_code"
                name="icd_code"
                placeholder="e.g., M51.16"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary_diagnoses">Secondary Diagnoses</Label>
              <Input
                id="secondary_diagnoses"
                name="secondary_diagnoses"
                placeholder="Comma-separated list"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="procedure_id">Procedure Required *</Label>
              <Select name="procedure_id">
                <SelectTrigger id="procedure_id">
                  <SelectValue placeholder="Select a procedure" />
                </SelectTrigger>
                <SelectContent>
                  {procedures.map((procedure) => (
                    <SelectItem
                      key={procedure.id}
                      value={procedure.id.toString()}
                    >
                      {procedure.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.procedure_id && (
                <p className="text-sm text-destructive">
                  {state.errors.procedure_id[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommended_procedure">
                Recommended Procedure Details
              </Label>
              <Input
                id="recommended_procedure"
                name="recommended_procedure"
                placeholder="Specific procedure notes"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="case_complexity">Case Complexity *</Label>
              <Select name="case_complexity">
                <SelectTrigger id="case_complexity">
                  <SelectValue placeholder="Select complexity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straightforward">Straightforward</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                  <SelectItem value="highly complex">Highly Complex</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.case_complexity && (
                <p className="text-sm text-destructive">
                  {state.errors.case_complexity[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferred_timeline">Preferred Timeline *</Label>
              <Select name="preferred_timeline">
                <SelectTrigger id="preferred_timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="within a month">Within a month</SelectItem>
                  <SelectItem value="within 3 months">Within 3 months</SelectItem>
                  <SelectItem value="within 6 months">Within 6 months</SelectItem>
                  <SelectItem value="not sure">Not sure</SelectItem>
                  <SelectItem value="researching">Researching</SelectItem>
                </SelectContent>
              </Select>
              {state.errors?.preferred_timeline && (
                <p className="text-sm text-destructive">
                  {state.errors.preferred_timeline[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="referral_reason">Reason for Referral *</Label>
            <Select name="referral_reason">
              <SelectTrigger id="referral_reason">
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
                <SelectItem value="second opinion">Second opinion</SelectItem>
                <SelectItem value="complicated revision surgery">
                  Complicated revision surgery
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {state.errors?.referral_reason && (
              <p className="text-sm text-destructive">
                {state.errors.referral_reason[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional clinical notes or context..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
