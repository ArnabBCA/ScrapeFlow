import {
  RUN_TASK_INPUT,
  TaskParamType,
  TaskType,
  WorkflowTask,
} from "@/lib/types";
import { CodeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML from the page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    RUN_TASK_INPUT,
    {
      name: "Web page",
      type: TaskParamType.BROWSE_INSTANCE,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "HTML",
      type: TaskParamType.STRING,
    },
  ] as const,
  credits: 2,
} satisfies WorkflowTask;
