"use client";

import { ActivityLog } from "@/components/activity/activity-log";
import { usePortfolio } from "@/hooks/use-portfolio";
import { PortfolioOverview } from "@/components/portfolio/portfolio-overview";
import { PortfolioSideRail } from "@/components/portfolio/portfolio-side-rail";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export default function PortfolioPage() {
  usePortfolio();
  const { portfolio, status, activity } = usePortfolioGuardStore();

  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8">
        <PortfolioOverview portfolio={portfolio} />
      </div>
      <div className="xl:col-span-4">
        <PortfolioSideRail portfolio={portfolio} status={status} />
      </div>
      <div className="xl:col-span-12">
        <ActivityLog activity={activity.slice(0, 2)} />
      </div>
    </div>
  );
}
