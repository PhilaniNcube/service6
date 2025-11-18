import { getUserAllergiesByClerkId } from "@/dal/queries/allergies";
import { getUserMedicationsByClerkId } from "@/dal/queries/medications";
import { getUserPastSurgeriesByClerkId } from "@/dal/queries/past_surgeries";
import { getMedicalHistorySummaryByClerkId } from "@/dal/queries/medical-history";
import { getDocumentsByClerkId } from "@/dal/queries/documents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Pill, Scissors, FileText, File } from "lucide-react";
import { format } from "date-fns";
import { cacheLife } from "next/cache";
import { UploadDocumentDialog } from "./upload-document-dialog";
import { getPublicR2Url } from "@/lib/r2";
import Link from "next/link";
import { Route } from "next";

interface ClientMedicalHistoryProps {
  params: Promise<{ id: string }>;
}

export async function ClientMedicalHistory({ params }: ClientMedicalHistoryProps) {
 

  const resolvedParams = await params;
  const [allergies, medications, pastSurgeries, medicalBackground, documents] = await Promise.all([
    getUserAllergiesByClerkId(resolvedParams.id),
    getUserMedicationsByClerkId(resolvedParams.id),
    getUserPastSurgeriesByClerkId(resolvedParams.id),
    getMedicalHistorySummaryByClerkId(resolvedParams.id),
    getDocumentsByClerkId(resolvedParams.id),
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
        <CardDescription>Complete medical records and health information</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="allergies" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="allergies" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Allergies
              {allergies.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {allergies.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medications
              {medications.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {medications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="surgeries" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              Past Surgeries
              {pastSurgeries.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {pastSurgeries.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="background" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Background
              {medicalBackground.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {medicalBackground.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <File className="h-4 w-4" />
              Documents
              {documents.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {documents.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="allergies" className="mt-4">
            {allergies.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No allergies recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base">{allergy.allergy}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Recorded on {format(new Date(allergy.createdAt), "MMMM d, yyyy")}
                        </p>
                      </div>
                      <Badge variant="destructive">Active</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="medications" className="mt-4">
            {medications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Pill className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No medications recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-base">{medication.name}</h4>
                      {medication.end_date && new Date(medication.end_date) > new Date() ? (
                        <Badge variant="default">Active</Badge>
                      ) : medication.end_date ? (
                        <Badge variant="secondary">Completed</Badge>
                      ) : (
                        <Badge variant="default">Ongoing</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Dosage:</span>{" "}
                        <span className="font-medium">{medication.dosage}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frequency:</span>{" "}
                        <span className="font-medium">{medication.frequency}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>{" "}
                        <span className="font-medium">
                          {medication.start_date
                            ? format(new Date(medication.start_date), "MMM d, yyyy")
                            : "Not specified"}
                        </span>
                      </div>
                    </div>
                    {medication.end_date && (
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">End Date:</span>{" "}
                        <span className="font-medium">
                          {format(new Date(medication.end_date), "MMM d, yyyy")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="surgeries" className="mt-4">
            {pastSurgeries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Scissors className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No past surgeries recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastSurgeries.map((surgery) => (
                  <div
                    key={surgery.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Recorded on {format(new Date(surgery.createdAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                    {surgery.notes && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm">{surgery.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="background" className="mt-4">
            {medicalBackground.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No medical background information recorded</p>
              </div>
            ) : (
              <div className="space-y-3">
                {medicalBackground.map((background) => (
                  <div
                    key={background.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-muted-foreground">
                        Recorded on {format(new Date(background.createdAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                    {background.notes && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm">{background.notes}</p>
                      </div>
                    )}
                    {background.updatedAt &&
                      new Date(background.updatedAt).getTime() !==
                        new Date(background.createdAt).getTime() && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Last updated: {format(new Date(background.updatedAt), "MMMM d, yyyy")}
                        </p>
                      )}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <div className="space-y-4">
              <div className="flex justify-end">
                <UploadDocumentDialog clerkId={resolvedParams.id} />
              </div>
              
              {documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <File className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No documents uploaded</p>
                  <p className="text-sm mt-1">Upload documents using the button above</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <Link
                      key={doc.id}
                      href={getPublicR2Url(doc.storage_key) as Route}
                      target="_blank"
                      className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">
                            {doc.document_type.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {doc.file_type} • {(doc.file_size_bytes / 1024).toFixed(1)} KB
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Uploaded on {format(new Date(doc.createdAt), "MMMM d, yyyy")}
                          </p>
                        </div>
                        <Badge variant="secondary">View</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
