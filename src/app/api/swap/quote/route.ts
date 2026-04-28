import { NextRequest, NextResponse } from "next/server";
import { getSwapQuote } from "@/lib/uniswap/quote";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const quote = await getSwapQuote(body);
  return NextResponse.json(quote);
}
