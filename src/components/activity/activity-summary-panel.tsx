import type { ComponentType } from "react";
import { BrainCircuit, Fingerprint, Repeat2, ShieldCheck } from "lucide-react";
import type { ActivityItem } from "@/types/activity";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivitySummaryPanel({ activity }: { activity: ActivityItem[] }) {
  const swaps = activity.filter((item) => item.type === "swap").length;
  const analyses = activity.filter((item) => item.type === "analysis" || item.type === "decision").length;
  const identityEvents = activity.filter((item) => item.type === "ens").length;
  const pending = activity.filter((item) => item.status === "pending").length;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Event Mix</CardTitle>
          <CardDescription>How the agent has been spending its recent cycles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <SummaryRow icon={Repeat2} label="Swap executions" value={`${swaps}`} />
          <SummaryRow icon={BrainCircuit} label="Analysis passes" value={`${analyses}`} />
          <SummaryRow icon={Fingerprint} label="Identity updates" value={`${identityEvents}`} />
          <SummaryRow icon={ShieldCheck} label="Pending items" value={`${pending}`} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-white/6">
          <CardTitle>Audit Notes</CardTitle>
          <CardDescription>What makes this activity stream useful in production.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Traceability
            </div>
            <p className="mt-3 text-sm leading-6 text-white">
              Each event carries intent, reasoning, and where applicable a proof pointer or explorer link.
            </p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Operator Value
            </div>
            <p className="mt-3 text-sm leading-6 text-white">
              The log surfaces what happened, why it happened, and whether the behavior matched the current guardrails.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/4 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <p className="text-sm text-white">{label}</p>
        </div>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
