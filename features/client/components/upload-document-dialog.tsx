"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

type UploadDocumentDialogProps = {
  clerkId: string;
};

export function UploadDocumentDialog({ clerkId }: UploadDocumentDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("valid_passport");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || isUploading) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("clerkId", clerkId);

    try {
      setIsUploading(true);
      setError(null);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to upload document");
      }

      // Reset form and close dialog
      setFile(null);
      setDocumentType("valid_passport");
      setOpen(false);
      
      // Refresh the page to show the new document
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a new document for this client. Select the document type and choose a file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document type</Label>
              <Select
                value={documentType}
                onValueChange={(value) => setDocumentType(value)}
              >
                <SelectTrigger id="documentType" className="w-full">
                  <SelectValue placeholder="Select a document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valid_passport">Valid Passport</SelectItem>
                  <SelectItem value="visa">Visa (if available)</SelectItem>
                  <SelectItem value="passport_sized_photographs">
                    Recent Passport-Sized Photographs
                  </SelectItem>
                  <SelectItem value="referral_letter">
                    Referral Letter (if available)
                  </SelectItem>
                  <SelectItem value="laboratory_results">
                    Recent Laboratory Results (within the last 3-6 months)
                  </SelectItem>
                  <SelectItem value="biopsy_results">
                    Biopsy results (If available)
                  </SelectItem>
                  <SelectItem value="medical_imaging_reports">
                    Medical Imaging Reports and Digital Files (CT scan, MRI, X-ray reports)
                  </SelectItem>
                  <SelectItem value="medical_imaging_video_image">
                    Upload video/image of Medical imaging
                  </SelectItem>
                  <SelectItem value="proof_of_financial_means">
                    Proof of Financial means
                  </SelectItem>
                  <SelectItem value="travel_insurance">
                    Travel insurance (If available)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Document file</Label>
              <Input
                id="file"
                type="file"
                onChange={(event) => {
                  const selected = event.target.files?.[0] ?? null;
                  setFile(selected);
                }}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || isUploading}>
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
