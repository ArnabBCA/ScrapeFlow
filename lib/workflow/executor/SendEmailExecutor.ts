import { ExecutionEnviornment } from "@/lib/types";
import { SendEmailTask } from "../task/SendEmail";
import { sendEmail } from "@/actions/sendEmail";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/credential";

export async function SendEmailExecutor(
  enviornment: ExecutionEnviornment<typeof SendEmailTask>
): Promise<boolean> {
  try {
    const credentialId = enviornment.getInput("Credentials");
    if (!credentialId) {
      enviornment.log.error("input -> credentials is not defined");
      return false;
    }

    const credential = await prisma.credential.findUnique({
      where: { id: credentialId },
    });

    if (!credential) {
      enviornment.log.error("Credential not found");
      return false;
    }

    const plainCredentialValue = symmetricDecrypt(credential.value);
    if (!plainCredentialValue) {
      enviornment.log.error("Cannot decrypt credential");
      return false;
    }

    const targetEmail = enviornment.getInput("Target Email");
    if (!targetEmail) {
      enviornment.log.error("input -> targetEmail is not defined");
      return false;
    }

    const subject = enviornment.getInput("Subject");
    if (!subject) {
      enviornment.log.error("input -> Subject is not defined");
      return false;
    }

    const body = enviornment.getInput("Body");
    if (!body) {
      enviornment.log.error("input -> Body is not defined");
      return false;
    }

    const res = await sendEmail(
      targetEmail,
      subject,
      body,
      plainCredentialValue
    );

    if (res.status === "error") {
      enviornment.log.error(JSON.stringify(res.data, null, 4));
      return false;
    }

    enviornment.log.info(JSON.stringify(res.data, null, 4));

    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
