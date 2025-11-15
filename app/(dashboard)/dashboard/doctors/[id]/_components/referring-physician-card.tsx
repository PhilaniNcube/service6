import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Stethoscope } from "lucide-react";
import { getReferringPhysicianByClerkId } from "@/dal/queries/referring-physicians";
import { getCandidatePatientsForReferrer } from "@/dal/queries";
import { AddPatientDialog } from "./add-patient-dialog";

const ReferringPhysicianCard = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const referring = await getReferringPhysicianByClerkId(id);
  
  if (!referring) return null;
  
  const candidateUsers = await getCandidatePatientsForReferrer(referring.id);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Referring Physician Details
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            This doctor is registered as a referring physician.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Referring Physician</Badge>
          <AddPatientDialog
            referringPhysicianId={referring.id}
            candidates={candidateUsers}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="font-medium">{referring.full_name}</p>
          <p className="text-muted-foreground">
            {referring.qualification}
            {referring.specialty_name && ` · ${referring.specialty_name}`}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Practice</p>
            <p>{referring.medical_practice}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Council Number</p>
            <p>{referring.medical_council_number}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Country</p>
            <p>{referring.country_of_practice}</p>
          </div>
          {referring.preferred_contact_method && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Preferred Contact
              </p>
              <p className="capitalize">{referring.preferred_contact_method}</p>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{referring.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{referring.phone}</span>
          </div>
          {referring.alternative_contact_number && (
            <div className="flex items-center gap-2 sm:col-span-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Alt: {referring.alternative_contact_number}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferringPhysicianCard;
