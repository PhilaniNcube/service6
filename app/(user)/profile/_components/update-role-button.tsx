"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateUserRoleToDoctor } from "@/dal/actions/users";
import { toast } from "sonner";
import { UserCog } from "lucide-react";

type UpdateRoleButtonProps = {
  clerkId: string;
};

export function UpdateRoleButton({ clerkId }: UpdateRoleButtonProps) {
  const [state, formAction, pending] = useActionState(
    updateUserRoleToDoctor,
    { success: false, message: "" }
  );

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="clerk_id" value={clerkId} />
      <Button
        type="submit"
        disabled={pending}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <UserCog className="h-4 w-4" />
        {pending ? "Updating..." : "Sign Up As A Doctor"}
      </Button>
    </form>
  );
}
