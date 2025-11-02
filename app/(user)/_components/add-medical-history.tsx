"use client";

import type { User } from '@/drizzle/tables'
import React, { useActionState, useEffect, useRef } from 'react'
import { addMedicalBackground, type AddMedicalBackgroundState } from '@/dal/actions/users'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

const AddMedicalHistory = ({profile}: {profile: User}) => {
  const initialState: AddMedicalBackgroundState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    addMedicalBackground,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div>
      <form ref={formRef} action={formAction} className="space-y-6">
        {/* Hidden field for clerk_id */}
        <input type="hidden" name="clerk_id" value={profile.clerk_id} />

        {/* Notes field */}
        <div className="space-y-2">
          <Label htmlFor="notes">Medical Notes *</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Enter detailed medical history notes..."
            rows={8}
            disabled={isPending}
            className={state.errors?.notes ? "border-red-500" : ""}
          />
          {state.errors?.notes && (
            <p className="text-sm text-red-500">{state.errors.notes[0]}</p>
          )}
          <p className="text-sm text-muted-foreground">
            Minimum 10 characters, maximum 1000 characters
          </p>
        </div>

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
  )
}

export default AddMedicalHistory