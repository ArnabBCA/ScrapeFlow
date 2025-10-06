"use client";
import { Button } from "@/components/ui/button";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from "@xyflow/react";
import { XIcon } from "lucide-react";
import React, { Fragment } from "react";

function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  const { setEdges } = useReactFlow();

  return (
    <Fragment>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className="w-5 h-5 border cursor-pointer rounded-full hover:shadow-lg flex items-center justify-center"
            onClick={() =>
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id))
            }
          >
            <XIcon className="p-[1px] mt-[1px] ml-[1px]"/>
          </Button>
        </div>
      </EdgeLabelRenderer>
    </Fragment>
  );
}

export default DeletableEdge;
