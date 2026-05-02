"use client";

import { useState } from "react";
import { CheckCircle2, Save, SlidersHorizontal, Sparkles } from "lucide-react";
import type { PortfolioRule } from "@/types/rules";
import { useRules } from "@/hooks/use-rules";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RulesBuilder() {
  const storeRules = usePortfolioGuardStore((state) => state.rules);
  const { saveRules, isSaving } = useRules();
  const [draftRules, setDraftRules] = useState<PortfolioRule[] | null>(null);
  const rules = draftRules ?? storeRules;

  function updateRule(id: string, patch: Partial<PortfolioRule>) {
    setDraftRules(rules.map((rule) => (rule.id === id ? { ...rule, ...patch } : rule)));
  }

  function deleteRule(id: string) {
    setDraftRules(rules.filter((rule) => rule.id !== id));
  }

  function addRule() {
    const newRule: PortfolioRule = {
      id: crypto.randomUUID(),
      label: "New Rule",
      asset: "ETH",
      comparator: "lt",
      threshold: 0,
      action: "swap_to_usdc",
      amountPercent: 10,
      cadenceHours: 24,
      enabled: true,
    };
    setDraftRules([...rules, newRule]);
  }

  const activeRules = rules.filter((rule) => rule.enabled).length;

  return (
    <Card>
      <CardHeader className="border-b border-white/6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <SlidersHorizontal className="mr-1 h-3 w-3" />
                Rules Engine
              </Badge>
              <Badge variant="success">{activeRules} active</Badge>
            </div>
            <CardTitle className="mt-4">Execution guardrails</CardTitle>
            <CardDescription className="mt-1">
              Threshold-driven automation saved to persistent agent state for the decision and execution agents.
            </CardDescription>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 px-4 py-3 text-sm text-muted-foreground">
            Every change is persisted to agent memory before the next monitoring cycle begins.
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="rounded-lg border border-primary/14 bg-primary/6 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Policy engine</p>
              <p className="mt-2 text-lg font-semibold text-white">
                Thresholds are evaluated before autonomous cycles and before manual execution requests.
              </p>
            </div>
            <Badge variant="success">Persisted</Badge>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Active Rules</p>
            <p className="mt-3 text-2xl font-semibold text-white">{activeRules}</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Default Slippage</p>
            <p className="mt-3 text-2xl font-semibold text-white">0.5%</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-white/4 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Execution Window</p>
            <p className="mt-3 text-2xl font-semibold text-white">20 min</p>
          </div>
        </div>
        {rules.map((rule) => (
          <div key={rule.id} className="rounded-lg border border-white/8 bg-white/4 p-4">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-white">{rule.label}</p>
                  <Badge variant="secondary">{rule.asset}</Badge>
                  <Badge variant="secondary">{rule.comparator === "gt" ? "Above threshold" : "Below threshold"}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  If {rule.asset} {rule.comparator === "gt" ? "exceeds" : "drops below"} {rule.threshold}%,
                  {rule.action === "swap_to_usdc" ? " rotate into USDC" : " execute the configured action"}.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={rule.enabled ? "default" : "outline"}
                  onClick={() => updateRule(rule.id, { enabled: !rule.enabled })}
                >
                  {rule.enabled ? "Enabled" : "Disabled"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => deleteRule(rule.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="mb-4 rounded-lg border border-white/8 bg-black/15 px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-6">
                  Current action: move {rule.amountPercent}% of the specified asset exposure every {rule.cadenceHours} hours when the trigger condition is met.
                </span>
              </div>
            </div>
            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr_0.8fr]">
              <RuleField label="Rule name">
                <Input value={rule.label} onChange={(event) => updateRule(rule.id, { label: event.target.value })} />
              </RuleField>
              <RuleField label="Asset">
                <Input value={rule.asset} onChange={(event) => updateRule(rule.id, { asset: event.target.value })} />
              </RuleField>
              <RuleField label="Threshold %">
                <Input
                  type="number"
                  value={rule.threshold}
                  onChange={(event) => updateRule(rule.id, { threshold: Number(event.target.value) })}
                />
              </RuleField>
              <RuleField label="Trade size %">
                <Input
                  type="number"
                  value={rule.amountPercent}
                  onChange={(event) => updateRule(rule.id, { amountPercent: Number(event.target.value) })}
                />
              </RuleField>
              <RuleField label="Cadence hrs">
                <Input
                  type="number"
                  value={rule.cadenceHours}
                  onChange={(event) => updateRule(rule.id, { cadenceHours: Number(event.target.value) })}
                />
              </RuleField>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Rules are applied during every monitoring cycle and before manual chat execution.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addRule}>
              Add Rule
            </Button>
            <Button onClick={() => saveRules(rules)} disabled={isSaving}>
              <Save className="h-4 w-4" />
              Save Rules
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RuleField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2 text-sm">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
