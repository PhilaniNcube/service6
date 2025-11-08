import React, { Suspense } from "react";
import DoctorOverview from "./_components/doctor-overview";

const DoctorPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading doctor overview...</div>}>
        <DoctorOverview params={params} />
      </Suspense>
    </div>
  );
};

export default DoctorPage;
