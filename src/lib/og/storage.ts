import { getMemoryState, setMemoryState } from "@/lib/storage";
import type { ActivityItem } from "@/types/activity";
import type { PortfolioRule } from "@/types/rules";

export async function saveRulesToZeroG(rules: PortfolioRule[], address?: string) {
  const receipt =
    process.env.OG_STORAGE_ENABLED === "true"
      ? `0g://portfolio-guard/rules/${Date.now()}`
      : `local://portfolio-guard/rules/${Date.now()}`;

  setMemoryState(address, (current) => ({
    ...current,
    rules,
    activity: [
      {
        id: crypto.randomUUID(),
        type: "rule",
        title: "Rules updated",
        detail: `${rules.length} rule(s) saved to the agent state.`,
        reasoning: "Rules are persisted so the decision agent can replay them in future monitoring cycles.",
        timestamp: new Date().toISOString(),
        storageReceipt: receipt,
        status: "completed",
      },
      ...current.activity,
    ],
  }));

  return { receipt };
}

export async function appendActivityToZeroG(item: ActivityItem, address?: string) {
  setMemoryState(address, (current) => ({
    ...current,
    activity: [item, ...current.activity],
  }));

  return {
    receipt:
      item.storageReceipt ??
      (process.env.OG_STORAGE_ENABLED === "true"
        ? `0g://portfolio-guard/logs/${item.id}`
        : `local://portfolio-guard/logs/${item.id}`),
  };
}

export async function readRulesFromZeroG(address?: string) {
  return getMemoryState(address).rules;
}
