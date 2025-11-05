"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Procedure } from "@/drizzle/tables";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import React from "react";
import { DesiredProcedureForm } from "./desired-procedure-form";

const AddDesiredProcedure = ({ procedures }: { procedures: Procedure[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Desired Procedure
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-4 text-lg font-medium">
          Add Desired Procedure
        </DialogTitle>
        <DesiredProcedureForm procedures={procedures} />
      </DialogContent>
    </Dialog>
  );
};

export default AddDesiredProcedure;
