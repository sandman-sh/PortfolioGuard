import { formatDistanceToNowStrict } from "date-fns";
import { ArrowUpRight, ShieldCheck, PieChart } from "lucide-react";
import type { PortfolioSnapshot } from "@/types/portfolio";
import { formatPercent, formatUsd } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationChart } from "@/components/portfolio/allocation-chart";
import { TokenBalanceList } from "@/components/portfolio/token-balance-list";

export function PortfolioOverview({ portfolio }: { portfolio: PortfolioSnapshot | null }) {
  const largestPosition = portfolio?.tokens?.[0];

  const metrics = [
    {
      label: "Total Value",
      value: formatUsd(portfolio?.totalUsd ?? 0),
      accent: "text-foreground",
    },
    {
      label: "24h Change",
      value: formatPercent(portfolio?.totalChange24h ?? 0),
      accent: (portfolio?.totalChange24h ?? 0) >= 0 ? "text-emerald-400" : "text-red-400",
    },
    {
      label: "Tracked Assets",
      value: `${portfolio?.tokens.length ?? 0}`,
      accent: "text-foreground",
    },
    {
      label: "Largest Position",
      value: largestPosition ? `${largestPosition.symbol} ${largestPosition.allocation.toFixed(1)}%` : "--",
      accent: "text-foreground",
    },
  ];

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden h-full">
      <CardHeader className="border-b border-border/40 pb-4 bg-background/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Portfolio Overview
            </CardTitle>
            <CardDescription className="mt-1">
              Live testnet wallet composition and allocation analysis.
            </CardDescription>
          </div>
          <div className="rounded-md border border-border/50 bg-background/30 px-3 py-1.5 text-[11px] text-muted-foreground whitespace-nowrap">
            Refreshed{" "}
            <span className="font-medium text-foreground">
              {portfolio?.updatedAt
                ? formatDistanceToNowStrict(new Date(portfolio.updatedAt), { addSuffix: true })
                : "just now"}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col justify-between overflow-hidden">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">Allocation discipline</p>
                <p className="mt-2 text-lg font-bold text-foreground truncate" title={largestPosition ? `${largestPosition.symbol} leads the basket at ${largestPosition.allocation.toFixed(1)}%` : "No dominant position yet"}>
                  {largestPosition
                    ? `${largestPosition.symbol} leads the basket at ${largestPosition.allocation.toFixed(1)}%`
                    : "No dominant position yet"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  The portfolio surface is arranged for quick exposure checks before the agent stages any rebalance.
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 whitespace-nowrap justify-center">Exposure Visible</Badge>
                <Badge variant="outline" className="bg-background/50 text-muted-foreground border-border/50 whitespace-nowrap justify-center">Drift Ready</Badge>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-border/50 bg-background/30 p-5 overflow-hidden">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Position Note
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground line-clamp-3" title={largestPosition ? `${largestPosition.symbol} currently represents the largest piece of the managed basket with ${formatUsd(largestPosition.usdValue)} in notional exposure.` : "Fund the wallet to unlock richer allocation analytics and position commentary."}>
              {largestPosition
                ? `${largestPosition.symbol} represents the largest piece of the managed basket with ${formatUsd(largestPosition.usdValue)} in notional exposure.`
                : "Fund the wallet to unlock richer allocation analytics and position commentary."}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-border/50 bg-background/30 p-4 overflow-hidden">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate" title={metric.label}>{metric.label}</p>
              <p className={`mt-2 text-xl font-bold truncate ${metric.accent}`} title={metric.value}>{metric.value}</p>
            </div>
          ))}
        </div>
        
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-xl border border-border/50 bg-background/30 p-5 flex flex-col min-h-[300px]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Allocation Mix</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  Position weight by USD value.
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </div>
            <div className="flex-1 min-h-0 flex items-center justify-center">
              <AllocationChart portfolio={portfolio} />
            </div>
          </div>
          
          <div className="rounded-xl border border-border/50 bg-background/30 p-5 flex flex-col min-h-[300px]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Asset Breakdown</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  Detailed allocation for each tracked token.
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">{portfolio?.tokens.length ?? 0} assets</Badge>
            </div>
            <div className="flex-1 min-h-0">
              <TokenBalanceList portfolio={portfolio} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
