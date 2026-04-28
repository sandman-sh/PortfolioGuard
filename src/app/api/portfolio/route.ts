import { NextRequest, NextResponse } from "next/server";
import { fetchPortfolio } from "@/lib/portfolio/balances";
import { getMemoryState, setMemoryState } from "@/lib/storage";

function isHexAddress(value: string | null) {
  return Boolean(value && /^0x[a-fA-F0-9]{40}$/.test(value));
}

export async function GET(request: NextRequest) {
  const requestedAddress = request.nextUrl.searchParams.get("address");
  const address = isHexAddress(requestedAddress) ? (requestedAddress as `0x${string}`) : undefined;
  const memory = getMemoryState(address);
  const resolvedAddress = (address ?? memory.portfolio.address) || undefined;

  const portfolio = await fetchPortfolio(resolvedAddress);
  setMemoryState(resolvedAddress, (current) => ({
    ...current,
    portfolio: {
      ...portfolio,
      address: resolvedAddress ?? "",
    },
  }));

  const nextMemory = getMemoryState(resolvedAddress);

  return NextResponse.json({
    portfolio: nextMemory.portfolio,
    activity: nextMemory.activity,
    status: nextMemory.status,
    identity: nextMemory.identity,
    rules: nextMemory.rules,
    messages: nextMemory.messages,
  });
}
