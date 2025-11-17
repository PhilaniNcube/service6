import { getAllAppointmentsForAdmin } from "@/dal/queries/appointments";
import { AppointmentsTableClient } from "./appointments-table-client";


export type AdminAppointment = Awaited<
  ReturnType<typeof getAllAppointmentsForAdmin>
>[number];

export async function AppointmentsTable() {
  const appointments = await getAllAppointmentsForAdmin();

  return <AppointmentsTableClient appointments={appointments} />;
}
