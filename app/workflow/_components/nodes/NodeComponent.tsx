import NodeCard from "@/app/workflow/_components/nodes/NodeCard";
import NodeHeader from "@/app/workflow/_components/nodes/NodeHeader";
import { Badge } from "@/components/ui/badge";
import { AppNodeData } from "@/types/appNode";
import { NodeProps } from "@xyflow/react";
import { memo } from "react";

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === "true";
const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>DEV: {props.id}</Badge>}
      <NodeHeader taskType={nodeData.type} nodeId={props.id} />
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
