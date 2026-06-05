"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { updateReferringPhysician } from "@/features/doctor/update-referring-physician-actions";
import type { AddReferringPhysicianState } from "@/features/_shared/action-types";
import type { Specialty } from "@/drizzle/tables";
import { toast } from "sonner";

const initialState: AddReferringPhysicianState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

interface DoctorProfileFormProps {
  profile: {
    full_name: string;
    qualification: string;
    specialty_id: number;
    specialty_name: string;
    medical_practice: string;
    medical_council_number: string;
    country_of_practice: string;
    phone: string;
    email: string;
    preferred_contact_method: string | null;
    alternative_contact_number: string | null;
  };
  specialties: Specialty[];
}

export function DoctorProfileForm({ profile, specialties }: DoctorProfileFormProps) {
  const [state, formAction] = useActionState(updateReferringPhysician, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success && state.errors === undefined) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your professional details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                name="full_name"
                defaultValue={profile.full_name}
                required
              />
              {state.errors?.full_name && (
                <p className="text-sm text-destructive">
                  {state.errors.full_name[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification *</Label>
              <Input
                id="qualification"
                name="qualification"
                defaultValue={profile.qualification}
                required
                placeholder="e.g., MBChB, MMed"
              />
              {state.errors?.qualification && (
                <p className="text-sm text-destructive">
                  {state.errors.qualification[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty *</Label>
            <Select name="specialty" defaultValue={profile.specialty_id.toString()}>
              <SelectTrigger id="specialty">
                <SelectValue placeholder="Select your specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem
                    key={specialty.id}
                    value={specialty.id.toString()}
                  >
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.specialty && (
              <p className="text-sm text-destructive">
                {state.errors.specialty[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medical_practice">Medical Practice *</Label>
              <Input
                id="medical_practice"
                name="medical_practice"
                defaultValue={profile.medical_practice}
                required
              />
              {state.errors?.medical_practice && (
                <p className="text-sm text-destructive">
                  {state.errors.medical_practice[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="medical_council_number">Medical Council Number *</Label>
              <Input
                id="medical_council_number"
                name="medical_council_number"
                defaultValue={profile.medical_council_number}
                required
              />
              {state.errors?.medical_council_number && (
                <p className="text-sm text-destructive">
                  {state.errors.medical_council_number[0]}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country_of_practice">Country of Practice *</Label>
            <Input
              id="country_of_practice"
              name="country_of_practice"
              defaultValue={profile.country_of_practice}
              required
            />
            {state.errors?.country_of_practice && (
              <p className="text-sm text-destructive">
                {state.errors.country_of_practice[0]}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            How patients and administrators can reach you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={profile.phone}
                required
              />
              {state.errors?.phone && (
                <p className="text-sm text-destructive">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile.email}
                required
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_contact_method">Preferred Contact Method</Label>
              <Select
                name="preferred_contact_method"
                defaultValue={profile.preferred_contact_method || "email"}
              >
                <SelectTrigger id="preferred_contact_method">
                  <SelectValue placeholder="Select preferred method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="video call">Video Call</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternative_contact_number">
                Alternative Contact Number
              </Label>
              <Input
                id="alternative_contact_number"
                name="alternative_contact_number"
                type="tel"
                defaultValue={profile.alternative_contact_number || ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
