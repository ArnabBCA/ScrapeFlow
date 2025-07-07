import { ExecutionEnviornment } from "@/lib/types";
import { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/credential";
import { GoogleGenAI } from "@google/genai";

function extractJsonFromCodeBlock(text: string): string {
  const match = text.match(/```json\s*([\s\S]*?)\s*```/i);
  return match ? match[1].trim() : text.trim();
}

export async function ExtractDataWithAiExecutor(
  enviornment: ExecutionEnviornment<typeof ExtractDataWithAiTask>
): Promise<boolean> {
  try {
    const credentialId = enviornment.getInput("Credentials");
    if (!credentialId) {
      enviornment.log.error("input -> credentials is not defined");
      return false;
    }

    const content = enviornment.getInput("Content");
    if (!content) {
      enviornment.log.error("input -> content is not defined");
      return false;
    }

    const prompt = enviornment.getInput("Prompt");
    if (!prompt) {
      enviornment.log.error("input -> prompt is not defined");
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

    const ai = new GoogleGenAI({ apiKey: plainCredentialValue });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001", // You can also use gemini-1.5-pro-001 if needed
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text.",
            },
          ],
        },
        {
          role: "user",
          parts: [{ text: content }],
        },
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = response?.text; // Access the text property safely

    if (!result) {
      enviornment.log.error("Empty response from Gemini");
      return false;
    }

    const cleaned = extractJsonFromCodeBlock(result);

    enviornment.setOutput("Extracted Data", cleaned);
    return true;
  } catch (error: any) {
    enviornment.log.error(error.message || "Unknown error occurred");
    return false;
  }
}
