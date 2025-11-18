import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAppointmentDetailById } from "@/dal/queries/appointments";
import { ArrowLeft, Calendar, CheckCircle, Clock, Clock3, Edit, FileText, Mail, MapPin, Phone, Stethoscope, XCircle } from "lucide-react";
import Link from "next/link";



export async function AppointmentDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
  const detail = await getAppointmentDetailById(Number(id));

  if (!detail) {
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Appointment not found</h2>
        <p className="text-sm text-muted-foreground">
          The appointment you are looking for does not exist or may have been removed.
        </p>
      </div>
    );
  }

  const { appointment, patientUser, patient, patientCase, procedure, referringPhysician } = detail;

 const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-500"
      case "confirmed":
        return "bg-green-500/10 text-green-500"
      case "cancelled":
        return "bg-red-500/10 text-red-500"
      case "completed":
        return "bg-emerald-500/10 text-emerald-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getConsentColor = (consent: string) => {
    switch (consent) {
      case "written":
        return "bg-green-500/10 text-green-500"
      case "verbal":
        return "bg-blue-500/10 text-blue-500"
      case "pending":
        return "bg-amber-500/10 text-amber-500"
      case "emergency":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "simple":
        return "bg-green-500/10 text-green-500"
      case "moderate":
        return "bg-amber-500/10 text-amber-500"
      case "complex":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/appointments">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Appointment #{appointment.id}
              </h1>
              <p className="text-sm text-muted-foreground">
                View and manage appointment details
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Main Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Appointment Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Appointment Details</CardTitle>
                    <CardDescription>
                      Scheduled for {appointment.scheduled_at.toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {/* <Badge className={getStatusColor(patientCase.case_status)}>
                    {patientCase.case_status}
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Date</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.scheduled_at.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Time</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.appointment_time || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 text-sm font-medium text-foreground">Procedure</h3>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{procedure.name}</p>
                        <p className="text-sm text-muted-foreground">{procedure.description}</p>
                      </div>
                      <Badge className={getComplexityColor(patientCase.case_complexity!)}>
                        {patientCase.case_complexity}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {procedure.description}
                    </p>
                    {/* <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" />
                      <span>Duration: {procedure.duration}</span>
                    </div> */}
                  </div>
                </div>

                {appointment.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="mb-2 text-sm font-medium text-foreground">Notes</h3>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Patient & Case Information */}
            <Tabs defaultValue="patient" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Patient Information</TabsTrigger>
                <TabsTrigger value="case">Case Details</TabsTrigger>
              </TabsList>
              <TabsContent value="patient" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>Personal and contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p className="text-foreground">
                          {patientUser.first_name} {patientUser.last_name}
                        </p>
                      </div>
                      {/* <div>
                        <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                        <p className="text-foreground">
                          {patientUser.date_of_birth.toLocaleDateString()}
                        </p>
                      </div> */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <p className="text-foreground">{patientUser.email}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <p className="text-foreground">{patientUser.phone_number}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Country</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-foreground">{patientUser.country}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Consent Status</p>
                        <Badge className={getConsentColor(patient.patient_consent || "")}>
                          {patient.patient_consent}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="case" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Case Details</CardTitle>
                    <CardDescription>Medical case information and timeline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Case ID</p>
                        <p className="text-foreground">#{patientCase.id}</p>
                      </div>
                      {/* <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(patientCase.case_status)}>
                          {patientCase.case_status}
                        </Badge>
                      </div> */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Complexity</p>
                        <Badge className={getComplexityColor(patientCase.case_complexity!)}>
                          {patientCase.case_complexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Timeline</p>
                        <p className="text-foreground">{patientCase.preferred_timeline!}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* <div>
                      <h3 className="mb-3 text-sm font-medium text-foreground">Emergency Contact</h3>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Name</p>
                            <p className="text-foreground">{patientCase.emergency_contact_name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <p className="text-foreground">{patientCase.emergency_contact_number}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Referring Physician */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Referring Physician
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">
                    {referringPhysician.full_name} 
                  </p>
                  <p className="text-sm text-muted-foreground">{referringPhysician.specialty}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Practice</p>
                    <p className="text-sm text-foreground">{referringPhysician.medical_practice}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">License</p>
                    <p className="text-sm text-foreground">{referringPhysician.medical_council_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm text-foreground">{referringPhysician.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm text-foreground">{referringPhysician.phone}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Physician
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Medical Records
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                <Button className="w-full" variant="outline">
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>

            {/* Timeline Info */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground">Created</p>
                  <p className="text-foreground">{appointment.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-foreground">{appointment.updatedAt.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails;