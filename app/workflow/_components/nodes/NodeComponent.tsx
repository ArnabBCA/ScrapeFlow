import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import NodeInput from "./NodeInput";
import NodeOutput from "./params/NodeOutput";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process?.env?.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>DEV:{props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
      <div className="flex flex-col divide-y gap-2">
        {task.inputs.map((input, i) => (
          <NodeInput
            input={input}
            key={input.name}
            nodeId={props.id}
            isLastInput={
              task.outputs.length === 0 && i === task.inputs.length - 1
            }
          />
        ))}
        {task.outputs.map((output, i) => (
          <NodeOutput
            output={output}
            key={output.name}
            isLastOutput={i === task.outputs.length - 1}
          />
        ))}
      </div>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
