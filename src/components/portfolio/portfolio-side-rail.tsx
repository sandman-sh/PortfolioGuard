import { PieChart, ShieldCheck, Wallet } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import type { AgentStatus } from "@/types/agent";
import type { PortfolioSnapshot } from "@/types/portfolio";
import { formatUsd } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PortfolioSideRailProps = {
  portfolio: PortfolioSnapshot | null;
  status: AgentStatus | null;
};

export function PortfolioSideRail({ portfolio, status }: PortfolioSideRailProps) {
  const tokens = [...(portfolio?.tokens ?? [])].sort((a, b) => b.usdValue - a.usdValue);
  const topTwo = tokens.slice(0, 2);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Position Ladder</CardTitle>
          <CardDescription>Where capital is concentrated right now.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {!topTwo.length ? (
            <div className="rounded-lg border border-white/8 bg-white/4 p-4 text-sm leading-6 text-muted-foreground">
              No positions yet. Once the managed wallet is funded, top concentrations appear here for rapid risk review.
            </div>
          ) : null}
          {topTwo.map((token, index) => (
            <div key={token.symbol} className="rounded-lg border border-white/8 bg-white/4 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/5 text-xs text-muted-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{token.symbol}</p>
                    <p className="text-sm text-muted-foreground">{token.allocation.toFixed(1)}% allocation</p>
                  </div>
                </div>
                <p className="font-medium text-white">{formatUsd(token.usdValue)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Execution Posture</CardTitle>
          <CardDescription>Current operating stance for the managed wallet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="rounded-lg border border-primary/14 bg-primary/6 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Portfolio mode</p>
            <p className="mt-3 text-lg font-semibold text-white">Conservative rebalancing with visible guardrails</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Rebalance Policy
            </div>
            <p className="mt-3 text-sm leading-6 text-white">
              Keep concentration controlled, maintain stablecoin buffer, and favor explainable moves over aggressive rotation.
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <PieChart className="h-4 w-4 text-primary" />
              Next Agent Check
            </div>
            <p className="mt-3 text-sm text-white">
              {status?.nextCheckAt
                ? new Date(status.nextCheckAt) <= new Date()
                  ? "Imminent"
                  : formatDistanceToNowStrict(new Date(status.nextCheckAt), { addSuffix: true })
                : "--"}
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Wallet className="h-4 w-4 text-primary" />
              Operating Mode
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="success">Sepolia only</Badge>
              <Badge variant="secondary">0.5% slippage</Badge>
              <Badge variant="secondary">20 min deadline</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
