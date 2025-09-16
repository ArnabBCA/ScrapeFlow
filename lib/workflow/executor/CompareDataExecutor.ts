import { ExecutionEnviornment } from "@/lib/types";
import { CompareDataTask } from "../task/CompareData";

export async function CompareDataExecutor(
  enviornment: ExecutionEnviornment<typeof CompareDataTask>
): Promise<boolean> {
  try {
    const data1 = enviornment.getInput("Data1").trim();
    const data2 = enviornment.getInput("Data2").trim();

    if (JSON.stringify(data1) === JSON.stringify(data2)) {
      enviornment.setOutput("Matched", "true");
    } else {
      enviornment.setOutput("Matched", "false");
    }
    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
