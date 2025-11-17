import AppointmentOverview from "@/app/(doctors)/_components/appointment-overview";
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
