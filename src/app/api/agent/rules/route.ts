import { NextRequest, NextResponse } from "next/server";
import { readRulesFromZeroG, saveRulesToZeroG } from "@/lib/og/storage";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address") ?? undefined;
  return NextResponse.json({ rules: await readRulesFromZeroG(address) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await saveRulesToZeroG(body.rules ?? [], body.address);
  return NextResponse.json({ rules: await readRulesFromZeroG(body.address), ...result });
}
