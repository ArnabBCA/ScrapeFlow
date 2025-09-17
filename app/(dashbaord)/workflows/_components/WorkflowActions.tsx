import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, ShuffleIcon, TrashIcon } from "lucide-react";
import { Fragment, useState } from "react";
import DeleteWorkflowDialog from "./DeleteWorkflowDialog";
import Link from "next/link";
import RunButton from "./RunButton";
import DuplicateWorkflowDialog from "./DuplicateWorkflowDialog";

function WorkflowActions({
  workflowName,
  workflowId,
  isDraft,
  workflowDescription,
}: {
  isDraft?: boolean;
  workflowName: string;
  workflowDescription?: string;
  workflowId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <Fragment>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!isDraft && (
            <DropdownMenuItem className="sm:hidden">
              <RunButton workflowId={workflowId} isActionButton={true} />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="sm:hidden">
            <Link
              href={`/workflow/editor/${workflowId}`}
              className={"flex items-center gap-2 w-full"}
            >
              <ShuffleIcon size={16} />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <DuplicateWorkflowDialog
              isActionButton={true}
              workflowId={workflowId}
              name={workflowName}
              description={workflowDescription || ""}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2 hover:!bg-destructive"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={18} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}

export default WorkflowActions;
