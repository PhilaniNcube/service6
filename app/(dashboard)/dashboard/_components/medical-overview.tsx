import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconAlertCircle, IconPill, IconScissors, IconHeartbeat } from "@tabler/icons-react"
import {
  getDashboardActiveMedications,
  getDashboardMedicalConditionsOverview,
  getDashboardRecentAllergies,
  getDashboardRecentSurgeries,
} from "@/dal/queries/dashboard-medical-overview"
import { getCurrentUser } from "@/dal/queries/users"

export async function MedicalOverview() {
  const user = await getCurrentUser()

  const [activeMedications, recentAllergies, recentSurgeries, medicalConditions] = await Promise.all([
    user ? getDashboardActiveMedications(user.id) : Promise.resolve([]),
    getDashboardRecentAllergies(),
    getDashboardRecentSurgeries(),
    getDashboardMedicalConditionsOverview(),
  ])

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
            {activeMedications.map((med) => (
              <div key={med.id} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{med.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.first_name ?? "Current patient"}
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
            {recentAllergies.map((allergy) => (
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
            {recentSurgeries.map((surgery) => (
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
            {Object.entries(medicalConditions).map(([condition, count]) => (
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
