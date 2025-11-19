import { Suspense } from "react";
import ProfileCard from "./_components/profile-card";
import { ProfileCardSkeleton } from "./_components/profile-card-skeleton";
import UploadDocumentForm from "../documents/UploadDocumentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfilePage = async () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <Suspense fallback={<ProfileCardSkeleton />}>
        {/* Current Profile View */}
        <ProfileCard />
      </Suspense>

      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload any relevant documents to associate them with your user account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UploadDocumentForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
