import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AddMedicationDialog from "./add-medication-dialog";
import MedicationItem from "./medication-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserMedications } from "@/dal/queries/medications";

const Medications = async () => {
  const medications = await getUserMedications();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-medium">Medications</CardTitle>
        <AddMedicationDialog />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-36">
          {medications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No medications recorded
            </p>
          ) : (
            medications.map((medication) => (
              <MedicationItem key={medication.id} medication={medication} />
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Medications;
