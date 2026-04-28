"use client";

import { ActivityLog } from "@/components/activity/activity-log";
import { OverviewStrip } from "@/components/dashboard/overview-strip";
import { EnsIdentityCard } from "@/components/ens/ens-identity-card";
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { AgentStatusCard } from "@/components/status/agent-status-card";
import { usePortfolio } from "@/hooks/use-portfolio";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export default function DashboardPage() {
  usePortfolio();
  const { portfolio, activity, identity, status } = usePortfolioGuardStore();

  return (
    <div className="space-y-6">
      <OverviewStrip portfolio={portfolio} identity={identity} activity={activity} />
      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <PortfolioOverview portfolio={portfolio} />
        </div>
        <div className="space-y-6 xl:col-span-4">
          <AgentStatusCard status={status} />
          <EnsIdentityCard identity={identity} />
        </div>
        <div className="xl:col-span-12">
          <ActivityLog activity={activity.slice(0, 3)} />
        </div>
      </div>
    </div>
  );
}
