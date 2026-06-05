import AppointmentOverview from "@/features/doctor/components/appointment-overview";
import React from "react";

const AppointmentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div>
      <AppointmentOverview paramsPromise={params} />
    </div>
  );
};

export default AppointmentPage;
