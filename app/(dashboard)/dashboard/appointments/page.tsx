

import { Input } from "@/components/ui/input";

import { AppointmentsTable } from "./_components/appointments-table";

export default async function AppointmentsPage() {


  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">All appointments</h1>
        <Input
          placeholder="Filter by patient, procedure, or notes"
          className="max-w-xs"
          name="appointments-filter"
          data-filter-input
        />
      </div>

      <AppointmentsTable />

    
    </div>
  );
}