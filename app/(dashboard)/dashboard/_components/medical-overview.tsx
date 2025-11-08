import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconAlertCircle, IconPill, IconScissors, IconHeartbeat } from "@tabler/icons-react"

// Placeholder data matching medications, allergies, and past_surgeries tables
const medicalData = {
  activeMedications: [
    {
      id: 1,
      user_name: "Sarah Johnson",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      start_date: new Date("2024-01-15"),
    },
    {
      id: 2,
      user_name: "James Williams",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      start_date: new Date("2024-03-20"),
    },
    {
      id: 3,
      user_name: "Maria Garcia",
      name: "Levothyroxine",
      dosage: "75mcg",
      frequency: "Once daily in morning",
      start_date: new Date("2024-05-10"),
    },
  ],
  recentAllergies: [
    {
      id: 1,
      user_name: "Sarah Johnson",
      allergy: "Penicillin",
      createdAt: new Date("2024-10-15"),
    },
    {
      id: 2,
      user_name: "David Chen",
      allergy: "Latex",
      createdAt: new Date("2024-10-20"),
    },
    {
      id: 3,
      user_name: "Emma Brown",
      allergy: "Ibuprofen",
      createdAt: new Date("2024-11-01"),
    },
  ],
  recentSurgeries: [
    {
      id: 1,
      user_name: "James Williams",
      notes: "Appendectomy - Laparoscopic procedure, no complications",
      createdAt: new Date("2023-08-15"),
    },
    {
      id: 2,
      user_name: "Maria Garcia",
      notes: "C-Section - Emergency cesarean delivery, routine recovery",
      createdAt: new Date("2022-11-20"),
    },
    {
      id: 3,
      user_name: "Sarah Johnson",
      notes: "Arthroscopic knee surgery - Meniscus repair, successful outcome",
      createdAt: new Date("2024-02-10"),
    },
  ],
  medicalConditions: {
    "High Blood Pressure": 45,
    Diabetes: 32,
    "Heart Disease": 18,
    "Lung Disease": 12,
    "Kidney Disease": 8,
    "Liver Disease": 5,
    "Autoimmune Disorder": 15,
    "Cancer History": 7,
  },
}

export function MedicalOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Active Medications */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconPill className="size-5 text-primary" />
            <CardTitle>Active Medications</CardTitle>
          </div>
          <CardDescription>
            Current patient medications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicalData.activeMedications.map((med) => (
              <div key={med.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {med.user_name}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {med.dosage}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {med.frequency}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Allergies */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconAlertCircle className="size-5 text-destructive" />
            <CardTitle>Recent Allergies</CardTitle>
          </div>
          <CardDescription>
            Newly reported patient allergies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicalData.recentAllergies.map((allergy) => (
              <div key={allergy.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-destructive">
                      {allergy.allergy}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {allergy.user_name}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {allergy.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Surgeries */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconScissors className="size-5 text-blue-600" />
            <CardTitle>Recent Surgeries</CardTitle>
          </div>
          <CardDescription>
            Recent surgical history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {medicalData.recentSurgeries.map((surgery) => (
              <div key={surgery.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="font-medium text-sm">{surgery.user_name}</div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {surgery.notes}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {surgery.createdAt.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medical Conditions Overview */}
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconHeartbeat className="size-5 text-primary" />
            <CardTitle>Medical Conditions Overview</CardTitle>
          </div>
          <CardDescription>
            Patient distribution by medical conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(medicalData.medicalConditions).map(([condition, count]) => (
              <div key={condition} className="border rounded-lg p-4">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {condition}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
