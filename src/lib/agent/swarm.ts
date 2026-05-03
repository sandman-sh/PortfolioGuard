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
  const prompt = `User Request: "${message}"\n\nCurrent Portfolio:\n${JSON.stringify(portfolio.tokens, null, 2)}\n\nActive Rules:\n${JSON.stringify(rules, null, 2)}\n\nAnalyze the portfolio against the rules and the user's request. Formulate a decision based on the system prompt instructions.`;
  
  const analysis = await runZeroGCompute(prompt);

  return {
    analysis,
    decision: analysis.shouldSwap
      ? {
          type: "swap" as const,
          tokenIn: analysis.tokenIn ?? "ETH",
          tokenOut: analysis.tokenOut ?? "USDC",
          amountUsd: analysis.amountUsd ?? 0,
          slippageBps: 50,
        }
      : {
          type: "hold" as const,
        },
  };
}
