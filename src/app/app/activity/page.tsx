"use client";

import { ActivitySummaryPanel } from "@/components/activity/activity-summary-panel";
import { usePortfolio } from "@/hooks/use-portfolio";
import { ActivityLog } from "@/components/activity/activity-log";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export default function ActivityPage() {
  usePortfolio();
  const activity = usePortfolioGuardStore((state) => state.activity);

  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8">
        <ActivityLog activity={activity} />
      </div>
      <div className="xl:col-span-4">
        <ActivitySummaryPanel activity={activity} />
      </div>
    </div>
  );
}
