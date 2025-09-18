import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type SendEmailTemplateProps = {
  message: string;
  workflowId?: string;
  executionId?: string;
};

export default function SendEmailTemplate({
  message,
  workflowId,
  executionId,
}: SendEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>New Email from ScrapeFlow</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                New Email from ScrapeFlow
              </Heading>
              <Text>{message}</Text>
              {/*<Hr />*/}
              {/*<Text>Workflow ID: {workflowId}</Text>*/}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
