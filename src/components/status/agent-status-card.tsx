import { Activity, DatabaseZap, Orbit, TimerReset, Bot } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import type { AgentStatus } from "@/types/agent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AgentStatusCard({ status }: { status: AgentStatus | null }) {
  const nextCheckValue = !status
    ? "--"
    : new Date(status.nextCheckAt) <= new Date()
      ? "imminent"
      : formatDistanceToNowStrict(new Date(status.nextCheckAt), { addSuffix: true });

  const stateLabel =
    status?.state === "executing"
      ? "executing"
      : status?.state === "idle"
        ? "idle"
        : "monitoring";

  const metrics = [
    {
      label: "Network",
      value: status?.network ?? "Ethereum Sepolia",
      icon: Orbit,
    },
    {
      label: "Last Checked",
      value: status ? formatDistanceToNowStrict(new Date(status.lastCheckedAt), { addSuffix: true }) : "--",
      icon: Activity,
    },
    {
      label: "Next Check",
      value: nextCheckValue,
      icon: TimerReset,
    },
    {
      label: "Memory Key",
      value: status?.memoryKey ?? "local://portfolio-guard/guest",
      icon: DatabaseZap,
      mono: true,
    },
  ];

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden h-full flex flex-col">
      <CardHeader className="border-b border-border/40 pb-4 bg-background/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Agent Status
            </CardTitle>
            <CardDescription className="mt-1">
              Autonomous monitoring and persistent state.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-none font-normal">Online</Badge>
            <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">{stateLabel}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-5 flex-1">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center justify-between gap-3 overflow-hidden">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Cycle posture</p>
            <p className="mt-1 text-sm font-medium text-foreground truncate" title={stateLabel === "executing" ? "Trade execution in progress" : "Monitoring and waiting for trigger conditions"}>
              {stateLabel === "executing" ? "Trade execution in progress" : "Monitoring for trigger conditions"}
            </p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 shrink-0">Persistent</Badge>
        </div>
        
        <div className="grid gap-3 grid-cols-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-border/50 bg-background/30 p-3 overflow-hidden flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                <metric.icon className="h-3 w-3 text-primary/70 shrink-0" />
                <span className="truncate">{metric.label}</span>
              </div>
              <p
                className={`mt-1.5 text-sm font-semibold text-foreground truncate ${metric.mono ? "font-mono text-xs text-muted-foreground" : ""}`}
                title={metric.value}
              >
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
