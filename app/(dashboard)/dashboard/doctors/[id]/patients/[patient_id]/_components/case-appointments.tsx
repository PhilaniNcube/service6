import { format } from "date-fns";
import { AddAppointmentDialog } from "./add-appointment-dialog";
import type { Appointment } from "@/drizzle/tables";

interface CaseAppointmentsProps {
  appointments: Appointment[];
  patientId: number;
  patientCaseId: number;
  referringPhysicianId: number;
}

export function CaseAppointments({
  appointments,
  patientId,
  patientCaseId,
  referringPhysicianId,
}: CaseAppointmentsProps) {
  return (
    <div className="mt-3 space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">Appointments</p>
        <AddAppointmentDialog
          patientId={patientId}
          patientCaseId={patientCaseId}
          referringPhysicianId={referringPhysicianId}
        />
      </div>
      {appointments.length === 0 ? (
        <p className="text-xs text-muted-foreground">No appointments scheduled yet.</p>
      ) : (
        <ul className="space-y-1">
          {appointments.map((a) => (
            <li
              key={a.id}
              className="text-xs text-muted-foreground max-w-2xl flex flex-col gap-2 p-4 rounded-md border border-muted-foreground/10 "
            >
              <span>{format(new Date(a.scheduled_at), "PP")}</span>
              {a.notes && <span className="truncate max-w-[200px]">{a.notes}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
