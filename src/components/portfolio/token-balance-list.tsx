import type { PortfolioSnapshot } from "@/types/portfolio";
import { formatPercent, formatUsd } from "@/lib/format";

export function TokenBalanceList({ portfolio }: { portfolio: PortfolioSnapshot | null }) {
  const tokens = portfolio?.tokens ?? [];

  if (!tokens.length) {
    return (
      <div className="rounded-lg border border-white/8 bg-white/4 p-6 text-sm text-muted-foreground">
        No tracked assets yet. Connect a wallet or fund the managed address to populate the portfolio table.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/8">
      <div className="grid grid-cols-[1.35fr_0.75fr_0.7fr_0.8fr] gap-3 border-b border-white/8 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <div>Asset / Price</div>
        <div>Balance</div>
        <div>Allocation</div>
        <div className="text-right">Value / 24h</div>
      </div>
      <div className="divide-y divide-white/6">
        {tokens.map((token) => (
          <div key={token.symbol} className="grid grid-cols-[1.35fr_0.75fr_0.7fr_0.8fr] gap-3 bg-white/3 px-4 py-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: token.color }} />
              <div>
                <p className="font-medium text-white">{token.symbol}</p>
                <p className="text-xs text-muted-foreground">
                  {token.name} · ${token.priceUsd.toFixed(token.symbol === "USDC" ? 2 : 4)}
                </p>
              </div>
            </div>
            <div className="text-white">
              {token.balance.toFixed(token.symbol === "USDC" ? 2 : 4)} {token.symbol}
            </div>
            <div className="text-white">{token.allocation.toFixed(1)}%</div>
            <div className="text-right">
              <p className="font-medium text-white">{formatUsd(token.usdValue)}</p>
              <p className={`text-xs ${token.change24h >= 0 ? "text-emerald-300" : "text-red-300"}`}>
                {formatPercent(token.change24h)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
