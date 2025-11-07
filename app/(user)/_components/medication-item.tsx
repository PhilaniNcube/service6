"use client";

import { Medication } from "@/drizzle/tables";
import React, { useState, useTransition } from "react";
import { deleteMedication } from "@/dal/actions/medications";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Loader2, Calendar, Pill } from "lucide-react";
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

const MedicationItem = ({ medication }: { medication: Medication }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteMedication(medication.id, medication.user_id.toString());
        toast.success("Medication deleted successfully");
        setOpen(false);
      } catch (error) {
        toast.error("Failed to delete medication");
        console.error(error);
      }
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex items-start justify-between py-3 border-b last:border-b-0 gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="default" className="font-medium">
            <Pill className="h-3 w-3 mr-1" />
            {medication.name}
          </Badge>
          <Badge variant="secondary">{medication.dosage}</Badge>
          <Badge variant="outline">{medication.frequency}</Badge>
        </div>
        
        {(medication.start_date || medication.end_date) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {medication.start_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Started: {formatDate(medication.start_date)}
              </span>
            )}
            {medication.end_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Ends: {formatDate(medication.end_date)}
              </span>
            )}
          </div>
        )}
        
        <span className="text-xs text-muted-foreground block">
          Added {new Date(medication.createdAt).toLocaleDateString()}
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
            <AlertDialogTitle>Delete Medication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{medication.name}</strong>? This action cannot be undone.
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

export default MedicationItem;
