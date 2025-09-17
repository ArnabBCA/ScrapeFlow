"use client";

import { ParamProps } from "@/lib/types";
import { useEffect } from "react";

function RunTaskParam({
  param,
  updateNodeParamValue,
  value,
  disabled,
}: ParamProps) {
  useEffect(() => {
    if (disabled) {
      updateNodeParamValue("undefined");
    } else {
      updateNodeParamValue("true");
    }
  }, [value, disabled]);

  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground">{param.name}</p>
    </div>
  );
}

export default RunTaskParam;
