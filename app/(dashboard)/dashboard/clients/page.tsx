import React, { Suspense } from "react";
import ClerkUsers from "@/features/user/components/clerk-users";
import ClerkUsersSkeleton from "@/features/user/components/clerk-users-skeleton";

const ClientsPage = async () => {
  return (
    <div>
      <Suspense fallback={<ClerkUsersSkeleton />}>
        <ClerkUsers />
      </Suspense>
    </div>
  );
};

export default ClientsPage;
