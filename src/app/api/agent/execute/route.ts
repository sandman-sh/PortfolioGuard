import { NextRequest, NextResponse } from "next/server";
import { recordExecutedDecision } from "@/lib/agent/orchestrator";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await recordExecutedDecision({
    address: body.address,
    txHash: body.txHash,
    amountUsd: body.amountUsd,
    tokenIn: body.tokenIn,
    tokenOut: body.tokenOut,
    explorerUrl: body.explorerUrl,
  });
  return NextResponse.json(result);
}
