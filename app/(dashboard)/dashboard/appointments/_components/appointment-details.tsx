import { getAppointmentDetailById } from "@/dal/queries/appointments";



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

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Appointment Details</h2>
        <p className="text-sm text-muted-foreground">
          Scheduled on {new Date(appointment.scheduled_at).toLocaleString()} at {appointment.appointment_time}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Patient</h3>
          <p className="text-sm font-semibold">
            {patientUser.first_name} {patientUser.last_name}
          </p>
          {patient.id && (
            <p className="text-xs text-muted-foreground">Patient ID: {patient.id}</p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Referring Doctor</h3>
          <p className="text-sm font-semibold">{referringPhysician.full_name}</p>
          {referringPhysician.email && (
            <p className="text-xs text-muted-foreground">{referringPhysician.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Case & Procedure</h3>
        <p className="text-sm font-semibold">{procedure.name}</p>
        <p className="text-xs text-muted-foreground">
          Diagnosis: {patientCase.diagnosis_name}
        </p>
      </div>

      {appointment.notes && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
          <p className="text-sm whitespace-pre-wrap">{appointment.notes}</p>
        </div>
      )}
    </div>
  );
}

export default AppointmentDetails;