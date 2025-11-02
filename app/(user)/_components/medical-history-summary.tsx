import { getMedicalHistorySummaryByClerkId } from "@/dal/medical-history";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText } from "lucide-react";
import { format } from "date-fns";

const MedicalHistorySummary = async ({ clerkId }: { clerkId: string }) => {
  const medicalHistory = await getMedicalHistorySummaryByClerkId(clerkId);

  if (medicalHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History
          </CardTitle>
          <CardDescription>
            Your medical history records will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              No medical history records found. Add your first entry to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Medical History
        </CardTitle>
        <CardDescription>
          {medicalHistory.length} {medicalHistory.length === 1 ? "record" : "records"} on file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {medicalHistory.map((entry, index) => (
            <div key={entry.id}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(entry.createdAt), "PPP")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(entry.createdAt), "p")}
                  </span>
                </div>
                
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {entry.notes}
                  </p>
                </div>

                {entry.updatedAt && entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
                  <p className="text-xs text-muted-foreground">
                    Last updated: {format(new Date(entry.updatedAt), "PPP 'at' p")}
                  </p>
                )}
              </div>
              
              {index < medicalHistory.length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalHistorySummary;
