import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserAllergies } from "@/dal/allergies";
import React from "react";
import AddAllergyDialog from "./add-allergy-dialog";
import AllergyItem from "./allergy-item";
import { ScrollArea } from "@/components/ui/scroll-area";

const Allergies = async () => {
  const allergies = await getUserAllergies();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-medium">Allergies</CardTitle>
        <AddAllergyDialog />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-36">
          {allergies.map((item) => (
            <AllergyItem key={item.id} allergy={item} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Allergies;
