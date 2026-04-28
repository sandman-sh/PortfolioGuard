import { NextRequest, NextResponse } from "next/server";
import { getMemoryState } from "@/lib/storage";

export async function GET(request: NextRequest) {
  const memory = getMemoryState(request.nextUrl.searchParams.get("address") ?? undefined);
  return NextResponse.json({ status: memory.status });
}
