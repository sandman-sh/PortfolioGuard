import { NextRequest, NextResponse } from "next/server";
import { handleAgentMessage } from "@/lib/agent/orchestrator";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await handleAgentMessage(body.message ?? "", body.address);
  return NextResponse.json(result);
}
