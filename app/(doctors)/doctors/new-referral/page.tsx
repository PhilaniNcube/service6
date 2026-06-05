import { getProcedures } from "@/features/procedure/procedure-queries";
import { NewReferralForm } from "@/features/doctor/components/new-referral-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTextIcon } from "lucide-react";

export const metadata = {
  title: "Submit New Referral | ApexMed Doctor Portal",
  description: "Submit a new patient referral for medical treatment in South Africa",
};

export default async function NewReferralPage() {
  const procedures = await getProcedures();

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submit New Referral</h1>
        <p className="text-muted-foreground">
          Refer a patient for medical treatment in South Africa
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileTextIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Referral Form</CardTitle>
              <CardDescription>
                Complete all required fields to submit a new patient referral
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <NewReferralForm procedures={procedures} />
        </CardContent>
      </Card>
    </div>
  );
}
