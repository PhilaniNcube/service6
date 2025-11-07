"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddAllergyForm from "./add-allergy-form";

const AddAllergyDialog = () => {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Allergy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {/* Replace the div below with the actual form component */}
        <DialogTitle>Add Allergy</DialogTitle>
        <AddAllergyForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddAllergyDialog;
