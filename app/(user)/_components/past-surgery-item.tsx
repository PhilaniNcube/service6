"use client";

import { PastSurgery } from "@/drizzle/tables";
import React, { useState, useTransition } from "react";
import { deletePastSurgery } from "@/dal/actions/past-surgeries";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const PastSurgeryItem = ({ surgery }: { surgery: PastSurgery }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePastSurgery(surgery.id, surgery.user_id.toString());
        toast.success("Past surgery deleted successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Failed to delete past surgery");
        console.error(error);
      }
    });
  };

  return (
    <div className="flex items-start justify-between py-3 border-b last:border-b-0 gap-4">
      <div className="flex-1">
        <p className="text-sm">{surgery.notes}</p>
        <span className="text-xs text-muted-foreground mt-1 block">
          Added {new Date(surgery.createdAt).toLocaleDateString()}
        </span>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Past Surgery</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this surgery record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PastSurgeryItem;
