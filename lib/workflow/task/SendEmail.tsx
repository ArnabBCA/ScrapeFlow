import {
  RUN_TASK_INPUT,
  TaskParamType,
  TaskType,
  WorkflowTask,
} from "@/lib/types";
import { LucideProps, MailIcon } from "lucide-react";

export const SendEmailTask = {
  type: TaskType.SEND_EMAIL,
  label: "Send Email",
  icon: (props: LucideProps) => (
    <MailIcon className="stroke-green-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    RUN_TASK_INPUT,
    {
      name: "Credentials",
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      name: "Target Email",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Subject",
      type: TaskParamType.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,
  outputs: [] as const,
  credits: 3,
} satisfies WorkflowTask;
