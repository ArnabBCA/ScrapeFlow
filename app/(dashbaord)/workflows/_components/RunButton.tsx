"use client";

import { runWorkflow } from "@/actions/runWorkflow";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PlayIcon } from "lucide-react";
import { toast } from "sonner";

function RunButton({
  workflowId,
  isActionButton,
}: {
  workflowId: string;
  isActionButton?: boolean;
}) {
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success("Workflow started", { id: workflowId });
    },
    onError: (error: any) => {
      if (error.message === "NEXT_REDIRECT") {
        toast.success("Workflow started", { id: workflowId });
      } else {
        toast.error(error.message || "Something went wrong", {
          id: workflowId,
        });
      }
    },
  });

  return (
    <>
      {isActionButton ? (
        <span
          className="flex items-center gap-2"
          onClick={() => {
            toast.success("Scheduling run...", { id: workflowId });
            mutation.mutate({
              workflowId,
            });
          }}
        >
          <PlayIcon size={16} />
          Run
        </span>
      ) : (
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex items-center gap-2"
          onClick={() => {
            toast.success("Scheduling run...", { id: workflowId });
            mutation.mutate({
              workflowId,
            });
          }}
        >
          <PlayIcon size={16} />
          Run
        </Button>
      )}
    </>
  );
}

export default RunButton;
