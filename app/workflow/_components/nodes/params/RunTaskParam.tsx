"use client";

import { ParamProps } from "@/lib/types";
import { useEffect } from "react";

function RunTaskParam({ param, updateNodeParamValue, value }: ParamProps) {
  useEffect(() => {
    updateNodeParamValue(value ?? "true");
  }, [value]);
  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground">{param.name}</p>
    </div>
  );
}

export default RunTaskParam;
