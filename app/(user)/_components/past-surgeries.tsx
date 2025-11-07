import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AddPastSurgeryDialog from "./add-past-surgery-dialog";
import PastSurgeryItem from "./past-surgery-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserPastSurgeries } from "@/dal/queries/past_surgeries";

const PastSurgeries = async () => {
  const surgeries = await getUserPastSurgeries();

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-medium">Past Surgeries</CardTitle>
        <AddPastSurgeryDialog />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-36">
          {surgeries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No past surgeries recorded
            </p>
          ) : (
            surgeries.map((surgery) => (
              <PastSurgeryItem key={surgery.id} surgery={surgery} />
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PastSurgeries;
