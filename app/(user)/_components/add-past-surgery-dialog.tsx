"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddPastSurgeryForm from "./add-past-surgery-form";
import { useUser } from "@clerk/nextjs";

const AddPastSurgeryDialog = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Surgery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>Add Past Surgery</DialogTitle>
        <AddPastSurgeryForm clerkId={user.id} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPastSurgeryDialog;
