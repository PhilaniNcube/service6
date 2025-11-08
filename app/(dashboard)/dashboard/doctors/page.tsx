import React, { Suspense } from "react";
import DoctorsList from "./_components/doctors-list";

const DoctorsPage = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading doctors...</div>}>
        <DoctorsList />
      </Suspense>
    </div>
  );
};

export default DoctorsPage;
