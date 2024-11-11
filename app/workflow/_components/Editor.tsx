"use client";

import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "@/app/workflow/_components/FlowEditor";
import { WorkflowStatus } from "@/types/workflow";

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <ReactFlowProvider>
      <FlowEditor workflow={workflow} />
    </ReactFlowProvider>
  );
}

export default Editor;
