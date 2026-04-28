import { buildAnalysisPrompt } from "@/lib/agent/prompts";
import { runZeroGCompute } from "@/lib/og/compute";
import type { PortfolioSnapshot } from "@/types/portfolio";
import type { PortfolioRule } from "@/types/rules";

export async function runAgentSwarm({
  message,
  portfolio,
  rules,
}: {
  message: string;
  portfolio: PortfolioSnapshot;
  rules: PortfolioRule[];
}) {
  const analysis = await runZeroGCompute(buildAnalysisPrompt(message));
  const ethAllocation = portfolio.tokens.find((token) => token.symbol === "ETH")?.allocation ?? 0;
  const trimRule = rules.find((rule) => rule.enabled && rule.asset === "ETH" && rule.comparator === "gt");

  const shouldSwap = /rebalance|conservative|swap/i.test(message) || Boolean(trimRule && ethAllocation > trimRule.threshold);

  return {
    analysis,
    decision: shouldSwap
      ? {
          type: "swap" as const,
          tokenIn: "ETH",
          tokenOut: "USDC",
          amountUsd: 280,
          slippageBps: 50,
        }
      : {
          type: "hold" as const,
        },
  };
}
