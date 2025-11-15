import { getAppointmentsByUserClerkId } from "@/dal/queries";
import { currentUser } from "@clerk/nextjs/server";

import type { Appointment } from "@/drizzle/tables";

export default async function AppointmentsPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-sm text-muted-foreground">
          You need to be signed in to view your appointments.
        </p>
      </div>
    );
  }

  const appointments = await getAppointmentsByUserClerkId(user.id);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-sm text-muted-foreground">
          All appointments linked to your account.
        </p>
      </div>

      {appointments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You have no scheduled appointments yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appointment: Appointment) => (
            <li
              key={appointment.id}
              className="rounded-md border bg-card p-4 text-sm"
            >
              <div className="font-medium">
                {new Date(appointment.scheduled_at).toLocaleString()}
              </div>
              {appointment.notes ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  {appointment.notes}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}