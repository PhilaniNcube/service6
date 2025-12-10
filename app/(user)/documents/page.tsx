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
import { document_types } from "@/drizzle/tables";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, FileText, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserUploadDocumentDialog } from "./UserUploadDocumentDialog";

const DocumentsPage = async () => {
  const user = await getCurrentUser();

  const documents = user ? await getDocumentsForUser(user.id) : [];

  // Helper to check if a document type is uploaded
  const isDocumentUploaded = (type: string) => {
    return documents.some((doc) => doc.document_type === type);
  };

  // Helper to format document type label
  const formatDocumentType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
        <p className="text-sm text-muted-foreground">
          Manage your required documents and uploads.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Document Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Document Checklist</CardTitle>
            <CardDescription>
              Please ensure all required documents are uploaded.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {document_types.map((type) => {
                const isUploaded = isDocumentUploaded(type);
                return (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {isUploaded ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {formatDocumentType(type)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isUploaded ? "Uploaded" : "Pending"}
                        </p>
                      </div>
                    </div>
                    {isUploaded ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                        Completed
                      </Badge>
                    ) : (
                      <UserUploadDocumentDialog
                        documentType={type}
                        documentLabel={formatDocumentType(type)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upload New Document (Generic) */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Other Documents</CardTitle>
            <CardDescription>
              Upload any additional documents here manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadDocumentForm />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Uploaded Documents</h2>
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
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                   <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No documents uploaded yet.
                </TableCell>
              </TableRow>
            ) : (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="capitalize">
                    {formatDocumentType(doc.document_type)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    <Link
                      target="_blank"
                      href={getPublicR2Url(doc.storage_key) as Route}
                      className="hover:underline text-blue-600"
                    >
                      {doc.storage_key}
                    </Link>
                  </TableCell>
                  <TableCell>{doc.file_type}</TableCell>
                  <TableCell>{(doc.file_size_bytes / 1024).toFixed(2)} KB</TableCell>
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
