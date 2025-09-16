import { RUN_TASK_INPUT, TaskParamType, TaskType, WorkflowTask } from "@/lib/types";
import { EqualIcon, LucideProps } from "lucide-react";

export const CompareDataTask = {
  type: TaskType.COMPARE_DATA,
  label: "Compare two data",
  icon: (props: LucideProps) => (
    <EqualIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    RUN_TASK_INPUT,
    {
      name: "Data1",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Data2",
      type: TaskParamType.STRING,
      required: true,
      variant: "textarea",
    },
  ] as const,
  outputs: [
    {
      name: "Matched",
      type: TaskParamType.STRING,
    },
  ] as const,
  credits: 1,
} satisfies WorkflowTask;
