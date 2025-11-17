import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointmentDetailById } from "@/dal/queries/appointments";
import { format } from "date-fns";

const AppointmentOverview = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) => {
  const params = await paramsPromise;
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return <div>Invalid appointment id</div>;
  }

  const detail = await getAppointmentDetailById(id);

  if (!detail) {
    return <div>Appointment not found</div>;
  }

  const { appointment, patient, patientUser, patientCase, procedure, referringPhysician } = detail;

 

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Appointment ID</span>
            <span>{appointment.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Scheduled At</span>
            <span>{appointment.scheduled_at ? format(new Date(appointment.scheduled_at), "PP") : "Not scheduled"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Appointment Time</span>
            <span>{appointment.appointment_time ?? "N/A"}</span>
          </div>
          {appointment.notes && (
            <div>
              <div className="font-medium mb-1">Notes</div>
              <p className="text-muted-foreground whitespace-pre-wrap">{appointment.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Name</span>
            <span>{[patientUser.first_name, patientUser.last_name].filter(Boolean).join(" ") || "Unknown"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>{patientUser.email}</span>
          </div>
          {patientUser.phone_number && (
            <div className="flex justify-between">
              <span className="font-medium">Phone</span>
              <span>{patientUser.phone_number}</span>
            </div>
          )}
          {patientUser.country && (
            <div className="flex justify-between">
              <span className="font-medium">Country</span>
              <span>{patientUser.country}</span>
            </div>
          )}
          {patient.patient_consent && (
            <div className="flex justify-between">
              <span className="font-medium">Consent</span>
              <span className="capitalize">{patient.patient_consent}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Referring Physician</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Name</span>
            <span>{referringPhysician.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Qualification</span>
            <span>{referringPhysician.qualification}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Practice</span>
            <span>{referringPhysician.medical_practice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Contact</span>
            <span>{referringPhysician.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>{referringPhysician.email}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 ">
        <CardHeader>
          <CardTitle>Case & Procedure</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">Diagnosis</span>
              <span>{patientCase.diagnosis_name}</span>
            </div>
            {patientCase.icd_code && (
              <div className="flex justify-between">
                <span className="font-medium">ICD Code</span>
                <span>{patientCase.icd_code}</span>
              </div>
            )}
            {patientCase.case_complexity && (
              <div className="flex justify-between">
                <span className="font-medium">Complexity</span>
                <span className="capitalize">{patientCase.case_complexity}</span>
              </div>
            )}
            {patientCase.referral_reason && (
              <div className="flex justify-between">
                <span className="font-medium">Referral Reason</span>
                <span className="capitalize">{patientCase.referral_reason}</span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">Recommended Procedure</span>
              <span>{patientCase.recommended_procedure || procedure.name}</span>
            </div>
            {procedure.description && (
              <div>
                <div className="font-medium mb-1">Procedure Description</div>
                <p className="text-muted-foreground whitespace-pre-wrap">{procedure.description}</p>
              </div>
            )}
            {patientCase.preferred_timeline && (
              <div className="flex justify-between">
                <span className="font-medium">Preferred Timeline</span>
                <span className="capitalize">{patientCase.preferred_timeline}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentOverview;
