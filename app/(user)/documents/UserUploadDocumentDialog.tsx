"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadDocumentForm from "./UploadDocumentForm";

type UserUploadDocumentDialogProps = {
  documentType: string;
  documentLabel: string;
};

export function UserUploadDocumentDialog({
  documentType,
  documentLabel,
}: UserUploadDocumentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload {documentLabel}</DialogTitle>
          <DialogDescription>
            Please upload your {documentLabel.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <UploadDocumentForm
            defaultDocumentType={documentType}
            onSuccess={handleSuccess}
            className="w-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
