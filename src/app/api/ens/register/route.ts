import { NextRequest, NextResponse } from "next/server";
import { registerSubname } from "@/lib/ens/subname";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await registerSubname(body.label ?? "guard", body.address);
  return NextResponse.json(result);
}
