import React from "react";
import UploadDocumentForm from "./UploadDocumentForm";
import { getCurrentUser } from "@/dal/queries";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDocumentsForUser } from "@/dal/queries";
import { getPublicR2Url } from "@/lib/r2";
import Link from "next/link";
import { Route } from "next";

const DocumentsPage = async () => {
  const user = await getCurrentUser();

  const documents = user ? await getDocumentsForUser(user.id) : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
      <p className="text-sm text-muted-foreground">
        Upload documents to Cloudflare R2 storage.
      </p>

      <UploadDocumentForm />

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Your documents</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Storage key</TableHead>
              <TableHead>File type</TableHead>
              <TableHead>Size (bytes)</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground">
                  No documents uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="capitalize">
                    {/* format the document type to capitalize each word */}
                    {doc.document_type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                    </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <Link target="_blank" href={getPublicR2Url(doc.storage_key) as Route}>
                      {doc.storage_key}
                    </Link>
                  </TableCell>
                  <TableCell>{doc.file_type}</TableCell>
                  <TableCell>{doc.file_size_bytes}</TableCell>
                  <TableCell>
                    {doc.createdAt
                      ? new Date(doc.createdAt).toLocaleString()
                      : ""}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentsPage;
