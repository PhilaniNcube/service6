"use client";

import { useState, useActionState } from "react";

import { createSpecialty, type CreateSpecialtyState } from "@/dal/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

const initialState: CreateSpecialtyState = {
  success: false,
  message: "",
};

export function AddSpecialtyDialog() {
  const [open, setOpen] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (prevState: CreateSpecialtyState, formData: FormData) => {
      const nextState = await createSpecialty(prevState, formData);

      if (nextState.success) {
        setOpen(false);
      }

      return nextState;
    },
    initialState
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add specialty</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new specialty</DialogTitle>
          <DialogDescription>
            Create a new specialty that can be assigned to referring physicians and
            cases.
          </DialogDescription>
        </DialogHeader>

        <form
          action={formAction}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Orthopedic Surgery"
              disabled={pending}
            />
            {state.errors?.name?.length ? (
              <p className="text-sm text-destructive">
                {state.errors.name.join(", ")}
              </p>
            ) : null}
          </div>

          {state.message && !state.success ? (
            <p className="text-sm text-destructive">{state.message}</p>
          ) : null}

          <DialogFooter className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending && <Spinner className="mr-2 h-4 w-4" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
