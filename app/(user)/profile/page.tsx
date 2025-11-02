import { Suspense } from "react";
import ProfileCard from "./_components/profile-card";
import { ProfileCardSkeleton } from "./_components/profile-card-skeleton";

const ProfilePage = async () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Suspense fallback={<ProfileCardSkeleton />}>
        {/* Current Profile View */}
        <ProfileCard />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
