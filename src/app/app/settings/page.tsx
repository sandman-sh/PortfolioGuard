"use client";

import { usePortfolio } from "@/hooks/use-portfolio";
import { useRules } from "@/hooks/use-rules";
import { RulesBuilder } from "@/components/rules/rules-builder";
import { RulesSideRail } from "@/components/rules/rules-side-rail";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export default function SettingsPage() {
  usePortfolio();
  useRules();
  const rules = usePortfolioGuardStore((state) => state.rules);

  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <div className="xl:col-span-8">
        <RulesBuilder />
      </div>
      <div className="xl:col-span-4">
        <RulesSideRail rules={rules} />
      </div>
    </div>
  );
}
