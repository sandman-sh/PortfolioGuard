import { Clock3, ShieldCheck, SlidersHorizontal } from "lucide-react";
import type { PortfolioRule } from "@/types/rules";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RulesSideRail({ rules }: { rules: PortfolioRule[] }) {
  const enabled = rules.filter((rule) => rule.enabled);
  const assets = [...new Set(enabled.map((rule) => rule.asset))];
  const fastestCadence = enabled.length ? Math.min(...enabled.map((rule) => rule.cadenceHours)) : 0;
  const avgThreshold = enabled.length
    ? Math.round(enabled.reduce((sum, rule) => sum + rule.threshold, 0) / enabled.length)
    : 0;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Policy Summary</CardTitle>
          <CardDescription>How the agent currently interprets your constraints.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Enabled rules
            </div>
            <p className="mt-3 text-2xl font-semibold text-white">{enabled.length}</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Clock3 className="h-4 w-4 text-primary" />
              Fastest cadence
            </div>
            <p className="mt-3 text-base font-semibold text-white">
              {fastestCadence ? `Every ${fastestCadence}h` : "No active cadence"}
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Average trigger
            </div>
            <p className="mt-3 text-base font-semibold text-white">{avgThreshold ? `${avgThreshold}%` : "No threshold set"}</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Monitored assets
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {assets.length ? assets.map((asset) => <Badge key={asset} variant="secondary">{asset}</Badge>) : <span className="text-sm text-white">None</span>}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Execution Policy</CardTitle>
          <CardDescription>Human-readable summary of how trades are constrained.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="rounded-lg border border-white/8 bg-white/4 p-4 text-sm leading-6 text-white">
            Rules are evaluated before autonomous cycles and before manual chat-triggered actions.
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4 text-sm leading-6 text-white">
            Rebalances are staged with fixed slippage and deadline controls so the agent behaves predictably.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
