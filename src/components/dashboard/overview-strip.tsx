import { Bot, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import type { ActivityItem } from "@/types/activity";
import type { AgentIdentity } from "@/types/agent";
import type { PortfolioSnapshot } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { formatUsd } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";

type OverviewStripProps = {
  portfolio: PortfolioSnapshot | null;
  identity: AgentIdentity | null;
  activity: ActivityItem[];
};

export function OverviewStrip({ portfolio, identity, activity }: OverviewStripProps) {
  const latest = activity[0];
  const positiveChange = (portfolio?.totalChange24h ?? 0) >= 0;

  const items = [
    {
      label: "Managed Value",
      value: formatUsd(portfolio?.totalUsd ?? 0),
      detail: `${portfolio?.tokens.length ?? 0} tracked assets`,
      icon: TrendingUp,
      tone: positiveChange ? "text-emerald-400" : "text-red-400",
    },
    {
      label: "Agent Identity",
      value: identity?.ensName ?? "Awaiting setup",
      detail: identity ? `Success rate ${identity.successRate}` : "No profile assigned",
      icon: Bot,
      tone: "text-foreground",
    },
    {
      label: "Latest Action",
      value: latest?.title ?? "No recent activity",
      detail: latest ? formatDistanceToNowStrict(new Date(latest.timestamp), { addSuffix: true }) : "Awaiting execution",
      icon: ShieldCheck,
      tone: "text-foreground",
    },
    {
      label: "Managed Wallet",
      value: portfolio?.address ? `${portfolio.address.slice(0, 6)}...${portfolio.address.slice(-4)}` : "Wallet pending",
      detail: portfolio?.address ? "Connected to Sepolia" : "Hydrating control plane",
      icon: Wallet,
      tone: "text-foreground",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                {item.label}
              </div>
              {item.label === "Managed Value" && portfolio && (
                <Badge variant="outline" className={`border-none text-[10px] uppercase font-bold tracking-wider ${positiveChange ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                  {portfolio.totalChange24h >= 0 ? "+" : ""}{portfolio.totalChange24h.toFixed(2)}%
                </Badge>
              )}
            </div>
            <div>
              <p className={`text-2xl font-bold truncate ${item.tone}`} title={item.value}>
                {item.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground truncate" title={item.detail}>
                {item.detail}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
