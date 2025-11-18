"use client";

import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
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

type UploadResult = {
  key?: string;
  url?: string | null;
  documentId?: number;
};

const UploadDocumentForm: React.FC = () => {
  const { userId } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("valid_passport");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || isUploading) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    if (userId) {
      formData.append("clerkId", userId);
    }

    try {
      setIsUploading(true);
      setError(null);
      setResult(null);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to upload document");
      }

      setResult({
        key: data.key,
        url: data.url ?? null,
        documentId: data.documentId,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="file">Document file</Label>
            <Input
              id="file"
              type="file"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                setFile(selected);
              }}
            />
          </div>

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
        </div>

        <Button type="submit" disabled={!file || isUploading}>
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="space-y-1 text-sm">
          {result.key && (
            <p>
              <span className="font-medium">Stored key:</span> {result.key}
            </p>
          )}
          {result.url && (
            <p>
              <span className="font-medium">Public URL:</span>{" "}
              <a
                href={result.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {result.url}
              </a>
            </p>
          )}
          {result.documentId && (
            <p>
              <span className="font-medium">Document ID:</span>{" "}
              {result.documentId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadDocumentForm;
