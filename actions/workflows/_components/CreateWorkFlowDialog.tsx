"use client";

import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layers2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateWorkFlowDialog = ({ triggerText }: { triggerText?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title={"Create workflow"}
          subTitle={"Start building your workflow"}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkFlowDialog;
