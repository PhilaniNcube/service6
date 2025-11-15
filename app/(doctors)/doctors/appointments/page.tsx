
import { auth } from "@clerk/nextjs/server";
import { getDoctorAppointments } from "@/dal/queries/appointments";

const DoctorAppointmentsPage = async () => {
  const { userId } = await auth();
  const appts = userId ? await getDoctorAppointments(userId) : [];

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-semibold">My appointments</h1>
      {appts.length === 0 ? (
        <p className="text-muted-foreground">You have no upcoming appointments.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {appts.map((appt) => (
            <li
              key={appt.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <span>
                {appt.patient_first_name} {appt.patient_last_name}
              </span>
              <span className="text-xs text-muted-foreground">
                {appt.scheduled_at?.toLocaleString?.() ?? "No date"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointmentsPage;
