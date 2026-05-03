import { addMinutes } from "date-fns";
import { readAgentMemory } from "@/lib/agent/memory";
import { runAgentSwarm } from "@/lib/agent/swarm";
import { appendActivityToZeroG } from "@/lib/og/storage";
import { fetchPortfolio } from "@/lib/portfolio/balances";
import { getMemoryState, setMemoryState } from "@/lib/storage";
import type { AgentDecision, AgentMessage } from "@/types/agent";

export async function handleAgentMessage(message: string, address?: `0x${string}`) {
  const memory = await readAgentMemory(address);
  const portfolio = await fetchPortfolio((address ?? memory.portfolio.address) || undefined);
  const swarm = await runAgentSwarm({ message, portfolio, rules: memory.rules });
  const status = {
    ...memory.status,
    state: swarm.decision.type === "swap" ? ("executing" as const) : ("online" as const),
    lastCheckedAt: new Date().toISOString(),
    nextCheckAt: addMinutes(new Date(), 20).toISOString(),
  };

  const decision: AgentDecision = {
    summary: swarm.analysis.summary || (swarm.decision.type === "swap"
        ? `I recommend swapping about $${swarm.decision.amountUsd} of ETH into USDC on Sepolia.`
        : "Current allocation is within your active limits, so I recommend holding."),
    reasoning: [
      `Analysis agent: ${swarm.analysis.summary}`,
      "Decision agent: Compared current wallet allocation to your active rules and the latest request.",
      swarm.decision.type === "swap"
        ? `Execution agent: Prepared a live Sepolia swap request for ${swarm.decision.amountUsd} USD notional.`
        : "Execution agent: No trade is staged because risk bands remain healthy.",
    ],
    recommendedAction: swarm.decision,
    status,
    portfolio,
    rules: memory.rules,
    activity: memory.activity,
  };

  const assistantMessage: AgentMessage = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: decision.summary,
    timestamp: new Date().toISOString(),
  };

  setMemoryState(address, (current) => ({
    ...current,
    portfolio,
    status,
    messages: [
      ...current.messages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      },
      assistantMessage,
    ],
  }));

  await appendActivityToZeroG(
    {
      id: crypto.randomUUID(),
      type: "decision",
      title: "Decision agent completed review",
      detail: decision.summary,
      reasoning: decision.reasoning.join(" "),
      timestamp: new Date().toISOString(),
      status: "completed",
      storageReceipt:
        process.env.OG_STORAGE_ENABLED === "true"
          ? `0g://portfolio-guard/decisions/${Date.now()}`
          : `local://portfolio-guard/decisions/${Date.now()}`,
    },
    address,
  );

  return {
    decision,
    messages: getMemoryState(address).messages,
    activity: getMemoryState(address).activity,
    status: getMemoryState(address).status,
  };
}

export async function recordExecutedDecision({
  address,
  txHash,
  amountUsd,
  tokenIn,
  tokenOut,
  explorerUrl,
}: {
  address: `0x${string}`;
  txHash: `0x${string}`;
  amountUsd: number;
  tokenIn: string;
  tokenOut: string;
  explorerUrl?: string;
}) {
  const portfolio = await fetchPortfolio(address);

  const activityItem = {
    id: crypto.randomUUID(),
    type: "swap" as const,
    title: "Executed Uniswap rebalance",
    detail: `Swapped approximately $${amountUsd} of ${tokenIn} into ${tokenOut} on Sepolia.`,
    reasoning:
      "Execution agent submitted the live wallet-approved Uniswap route and refreshed balances after confirmation.",
    timestamp: new Date().toISOString(),
    txHash,
    explorerUrl: explorerUrl ?? `https://sepolia.etherscan.io/tx/${txHash}`,
    storageReceipt:
      process.env.OG_STORAGE_ENABLED === "true"
        ? `0g://portfolio-guard/swaps/${Date.now()}`
        : `local://portfolio-guard/swaps/${Date.now()}`,
    status: "completed" as const,
  };

  await appendActivityToZeroG(activityItem, address);

  setMemoryState(address, (current) => ({
    ...current,
    portfolio,
    status: {
      ...current.status,
      state: "online",
      lastCheckedAt: new Date().toISOString(),
      nextCheckAt: addMinutes(new Date(), 20).toISOString(),
    },
    identity: {
      ...current.identity,
      lastAction: activityItem.detail,
      successRate: current.activity.length ? "100%" : current.identity.successRate,
    },
  }));

  return {
    decision: {
      summary: activityItem.detail,
      reasoning: [activityItem.reasoning],
      recommendedAction: {
        type: "swap" as const,
        tokenIn,
        tokenOut,
        amountUsd,
        slippageBps: 50,
      },
      status: getMemoryState(address).status,
      portfolio: getMemoryState(address).portfolio,
      rules: getMemoryState(address).rules,
      activity: getMemoryState(address).activity,
    },
    activity: getMemoryState(address).activity,
    status: getMemoryState(address).status,
  };
}
