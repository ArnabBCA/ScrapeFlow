"use server";
import { getAppUrl } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const now = new Date();

  const workflows = await prisma.workflow.findMany({
    select: {
      id: true,
    },
    where: {
      status: WorkflowStatus.PUBLISHED,
      cron: { not: null },
      nextRunAt: {
        lte: now,
      },
    },
  });
  for (const workflow of workflows) {
    const workflowId = workflow.id;
    const triggerApiUrl = getAppUrl(
      `api/workflows/execute?workflowId=${workflowId}`
    );

    if (!process.env.API_SECRET) {
      console.error("API_SECRET is not defined");
      return;
    }

    // Non-blocking, fire-and-forget
    fetch(triggerApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.API_SECRET}`,
      },
      cache: "no-store",
    }).catch((error) => {
      console.error(
        "Error triggering workflow with id",
        workflowId,
        ":",
        error?.message || error
      );
    });
  }
  return new Response(JSON.stringify({ workflowsToRun: workflows.length }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
