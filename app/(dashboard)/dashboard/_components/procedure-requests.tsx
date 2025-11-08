import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getRecentProcedureRequests } from "@/dal/queries/procedures";

// Placeholder data matching the desired_procedures table schema
const procedureRequests = [
  {
    id: 1,
    user_id: 1,
    clerk_id: "user_2abc123",
    patient_name: "Sarah Johnson",
    procedure_id: 1,
    procedure_name: "Rhinoplasty",
    treatment_timeline: "within a month",
    pain_level: 3,
    diagnosis_status: "yes",
    notes: "Patient has previous surgery experience",
    createdAt: new Date("2024-11-01"),
  },
  {
    id: 2,
    user_id: 2,
    clerk_id: "user_3def456",
    patient_name: "James Williams",
    procedure_id: 2,
    procedure_name: "Breast Augmentation",
    treatment_timeline: "within 3 months",
    pain_level: 2,
    diagnosis_status: "awaiting",
    notes: "Consultation scheduled for next week",
    createdAt: new Date("2024-11-02"),
  },
  {
    id: 3,
    user_id: 3,
    clerk_id: "user_4ghi789",
    patient_name: "Maria Garcia",
    procedure_id: 3,
    procedure_name: "Liposuction",
    treatment_timeline: "immediate",
    pain_level: 7,
    diagnosis_status: "yes",
    notes: "High priority - experiencing significant discomfort",
    createdAt: new Date("2024-11-03"),
  },
  {
    id: 4,
    user_id: 4,
    clerk_id: "user_5jkl012",
    patient_name: "David Chen",
    procedure_id: 4,
    procedure_name: "Facelift",
    treatment_timeline: "researching",
    pain_level: 1,
    diagnosis_status: "no",
    notes: "Patient requesting more information",
    createdAt: new Date("2024-11-04"),
  },
  {
    id: 5,
    user_id: 5,
    clerk_id: "user_6mno345",
    patient_name: "Emma Brown",
    procedure_id: 5,
    procedure_name: "Tummy Tuck",
    treatment_timeline: "within 6 months",
    pain_level: 4,
    diagnosis_status: "awaiting",
    notes: "Post-pregnancy consideration",
    createdAt: new Date("2024-11-05"),
  },
];

const getTimelineColor = (
  timeline: string
): "default" | "secondary" | "destructive" | "outline" => {
  const colors: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  > = {
    immediate: "destructive",
    "within a month": "default",
    "within 3 months": "secondary",
    "within 6 months": "outline",
    "not sure": "outline",
    researching: "outline",
  };
  return colors[timeline] || "outline";
};

const getDiagnosisColor = (
  status: string
): "default" | "secondary" | "outline" => {
  const colors: Record<string, "default" | "secondary" | "outline"> = {
    yes: "default",
    no: "secondary",
    awaiting: "outline",
  };
  return colors[status] || "outline";
};

export async function ProcedureRequests() {
  const recentRequests = await getRecentProcedureRequests();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Procedure Requests</CardTitle>
        <CardDescription>
          Current patient procedure requests and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Procedure</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Pain Level</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequests.map((request) => (
              <TableRow key={request.desired_procedures.id}>
                <TableCell className="font-medium">
                  {request.patient_name} {request.patient_last_name}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{request.procedure_name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                    {request.desired_procedures.notes || "No notes provided"}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className="capitalize"
                    variant={getTimelineColor(
                      request.desired_procedures.treatment_timeline ||
                        "not sure"
                    )}
                  >
                    {request.desired_procedures.treatment_timeline}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(request.desired_procedures.pain_level || 0) * 10}
                      className="h-2 w-16"
                    />
                    <span className="text-sm font-medium">
                      {request.desired_procedures.pain_level || 0}/10
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={getDiagnosisColor(
                      request.desired_procedures.diagnosis_status || "awaiting"
                    )}
                  >
                    {request.desired_procedures.diagnosis_status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {request.desired_procedures.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
