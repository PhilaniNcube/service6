"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  approveDoctorRequest,
  rejectDoctorRequest,
} from "@/dal/actions/users";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

type ReviewButtonsProps = {
  requestId: number;
};

export function ReviewButtons({ requestId }: ReviewButtonsProps) {
  const [approveState, approveAction, approvePending] = useActionState(
    approveDoctorRequest,
    { success: false, message: "" }
  );

  const [rejectState, rejectAction, rejectPending] = useActionState(
    rejectDoctorRequest,
    { success: false, message: "" }
  );

  useEffect(() => {
    if (approveState.message) {
      if (approveState.success) {
        toast.success(approveState.message);
      } else {
        toast.error(approveState.message);
      }
    }
  }, [approveState]);

  useEffect(() => {
    if (rejectState.message) {
      if (rejectState.success) {
        toast.success(rejectState.message);
      } else {
        toast.error(rejectState.message);
      }
    }
  }, [rejectState]);

  return (
    <div className="flex gap-2">
      <form action={approveAction}>
        <input type="hidden" name="request_id" value={requestId} />
        <Button
          type="submit"
          disabled={approvePending || rejectPending}
          size="sm"
          variant="default"
          className="gap-1.5"
        >
          <Check className="h-3.5 w-3.5" />
          {approvePending ? "Approving..." : "Approve"}
        </Button>
      </form>
      <form action={rejectAction}>
        <input type="hidden" name="request_id" value={requestId} />
        <Button
          type="submit"
          disabled={approvePending || rejectPending}
          size="sm"
          variant="destructive"
          className="gap-1.5"
        >
          <X className="h-3.5 w-3.5" />
          {rejectPending ? "Rejecting..." : "Reject"}
        </Button>
      </form>
    </div>
  );
}
