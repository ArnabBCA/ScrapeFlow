"use server";

/*import SendEmailTemplate from "@/components/SendEmailTemplate";
import { createElement } from "react";
import { Resend } from "resend";*/

export const sendEmail = async (
  targetEmail: string,
  subject: string,
  body: string,
  apiKey: string
) => {
  try {
    /*const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from: `${targetEmail} <onboarding@resend.dev>`,
      to: targetEmail,
      reply_to: targetEmail,
      subject: subject,
      react: createElement(SendEmailTemplate, {
        message: body,
      }),
    });

    return {
      status: "success",
      data: `Email Sent Successfully, id: ${data?.id}`,
    };*/
    return {
      status: "success",
      data: "Email sending is disabled in the this version",
    };
  } catch (error: any) {
    console.log("Error sending email:", error);
    return { status: "error", data: getErrorMessage(error) };
  }
};

function getErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  if (
    message.includes(
      "You can only send testing emails to your own email address"
    ) &&
    message.includes("(") &&
    message.includes(")") &&
    message.includes("@")
  ) {
    message =
      "You can only send emails to your own email " +
      message.slice(message.indexOf("("), message.indexOf(")") + 1).trim() +
      " registered in the resend website";
  }

  return message;
}
