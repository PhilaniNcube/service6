import { getMedicalHistorySummaryByClerkId } from "@/dal/medical-history";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, FileText, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddMedicalHistory from "./add-medical-history";
import { User } from "@/drizzle/tables";
import { ScrollArea } from "@/components/ui/scroll-area";

const MedicalHistorySummary = async ({ profile }: { profile: User }) => {
  const medicalHistory = await getMedicalHistorySummaryByClerkId(
    profile.clerk_id
  );

  if (medicalHistory.length === 0) {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History
          </CardTitle>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Add Medical History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add Medical History</DialogTitle>
                  <DialogDescription>
                    Please enter the details of your medical history including
                    any relevant conditions.
                  </DialogDescription>
                </DialogHeader>
                <AddMedicalHistory profile={profile} />
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Your medical history records will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              No medical history records found. Add your first entry to get
              started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardDescription>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical History <br />
          </CardTitle>
          {medicalHistory.length}{" "}
          {medicalHistory.length === 1 ? "record" : "records"} on file
        </CardDescription>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Stethoscope className="mr-2 h-4 w-4" />
                Add Medical History
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Medical History</DialogTitle>
                <DialogDescription>
                  Please enter the details of your medical history including any
                  relevant conditions.
                </DialogDescription>
              </DialogHeader>
              <AddMedicalHistory profile={profile} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="space-y-6 max-h-[300px] overflow-y-scroll">
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

                {entry.updatedAt &&
                  entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
                    <p className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {format(new Date(entry.updatedAt), "PPP 'at' p")}
                    </p>
                  )}
              </div>

              {index < medicalHistory.length - 1 && (
                <Separator className="my-3" />
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MedicalHistorySummary;
