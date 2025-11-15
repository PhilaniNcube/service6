"use client";

import { useMemo, useState, startTransition, useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { createAppointment, type CreateAppointmentState } from "@/dal/actions/appointments";
import { Loader2, Plus, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const initialState: CreateAppointmentState = {
  success: false,
  message: "",
};

interface AddAppointmentDialogProps {
  patientId: number;
  patientCaseId: number;
  referringPhysicianId: number;
}

export function AddAppointmentDialog({
  patientId,
  patientCaseId,
  referringPhysicianId,
}: AddAppointmentDialogProps) {
  const [state, formAction, pending] = useActionState(
    createAppointment,
    initialState
  );

  const handleAction: typeof formAction = async (formData) => {
    if (!selectedDate) {
      return;
    }

    // Ensure we pass an ISO string for the server action
    formData.set("scheduled_at", selectedDate.toISOString());

    startTransition(() => {
      formAction(formData);
    });
  };

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const today = useMemo(() => {
    const now = new Date();
    // Strip time to enforce whole-day comparison
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="mr-1 h-3 w-3" />
          Add appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New appointment</DialogTitle>
        </DialogHeader>
        <form action={handleAction} className="space-y-4">
          <input type="hidden" name="patient_id" value={patientId} />
          <input type="hidden" name="patient_case_id" value={patientCaseId} />
          <input
            type="hidden"
            name="referring_physician_id"
            value={referringPhysicianId}
          />

          <Field>
            <FieldLabel htmlFor="scheduled_at">Scheduled date &amp; time</FieldLabel>
            <FieldContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                    disabled={pending}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      selectedDate.toLocaleDateString()
                    ) : (
                      <span>Select a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FieldError
                errors={[
                  ...(state.errors?.scheduled_at || []).map((message) => ({
                    message,
                  })),
                ]}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <FieldContent>
              <Textarea
                id="notes"
                name="notes"
                disabled={pending}
              />
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
            <Button type="submit" disabled={pending} size="sm">
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Saving..." : "Save appointment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
