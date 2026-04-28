import { formatDistanceToNowStrict } from "date-fns";
import { ArrowUpRight, BrainCircuit, Fingerprint, Repeat2, ExternalLink } from "lucide-react";
import type { ActivityItem } from "@/types/activity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityLog({ activity }: { activity: ActivityItem[] }) {
  const icons = {
    analysis: BrainCircuit,
    decision: BrainCircuit,
    swap: Repeat2,
    ens: Fingerprint,
    rule: Repeat2,
  };

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4 bg-background/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle className="text-xl">Activity Log</CardTitle>
            <CardDescription className="mt-1">Onchain and offchain agent activity with reasoning and proofs.</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-background/50 text-muted-foreground">{activity.length} recent events</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {activity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border/50 rounded-xl bg-background/20">
            <BrainCircuit className="h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <p className="text-base font-medium text-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              The agent will log its actions, reasoning, and execution proofs here once active.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/40 rounded-xl border border-border/50 bg-background/30 overflow-hidden">
            {activity.map((item) => {
              const Icon = icons[item.type] ?? BrainCircuit;
              
              return (
                <div key={item.id} className="grid gap-4 p-5 md:grid-cols-[auto_1fr_auto] md:items-start hover:bg-background/40 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p className="font-semibold text-foreground truncate">{item.title}</p>
                      <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold border-none ${item.status === "completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>
                        {item.status}
                      </Badge>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-auto md:ml-2">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                    
                    {item.reasoning && (
                      <div className="mt-3 text-sm leading-relaxed text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/30 border-l-2 border-l-primary/40">
                        {item.reasoning}
                      </div>
                    )}
                    
                    <div className="mt-3 flex flex-wrap gap-4 text-xs font-medium">
                      {item.explorerUrl && (
                        <a
                          href={item.explorerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors bg-primary/5 px-2.5 py-1 rounded-md"
                        >
                          View Transaction
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {item.storageReceipt && (
                        <div className="inline-flex items-center gap-1.5 text-muted-foreground bg-background/50 px-2.5 py-1 rounded-md font-mono">
                          0G: {item.storageReceipt.substring(0, 8)}...
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-left md:text-right text-xs text-muted-foreground pt-1 shrink-0 whitespace-nowrap">
                    {formatDistanceToNowStrict(new Date(item.timestamp), { addSuffix: true })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
