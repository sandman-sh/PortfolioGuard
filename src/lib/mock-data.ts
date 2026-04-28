import { addMinutes, addHours, subMinutes } from "date-fns";
import type { ActivityItem } from "@/types/activity";
import type { AgentIdentity, AgentStatus } from "@/types/agent";
import type { PortfolioSnapshot } from "@/types/portfolio";
import type { PortfolioRule } from "@/types/rules";

export function getMockPortfolio(): PortfolioSnapshot {
  return {
    address: "",
    totalUsd: 12483.22,
    totalChange24h: 3.8,
    updatedAt: new Date().toISOString(),
    tokens: [
      {
        symbol: "ETH",
        name: "Ether",
        balance: 3.12,
        usdValue: 7470,
        priceUsd: 2394.23,
        allocation: 59.8,
        change24h: 4.5,
        color: "#00ff9d",
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 3425.2,
        usdValue: 3425.2,
        priceUsd: 1,
        allocation: 27.4,
        change24h: 0,
        color: "#4ea1ff",
      },
      {
        symbol: "WETH",
        name: "Wrapped Ether",
        balance: 0.66,
        usdValue: 1588.02,
        priceUsd: 2406.09,
        allocation: 12.8,
        change24h: 4.4,
        color: "#8a5cf6",
      },
    ],
  };
}

export function getMockRules(): PortfolioRule[] {
  return [
    {
      id: "rule-eth-55",
      label: "Trim ETH when it overheats",
      asset: "ETH",
      comparator: "gt",
      threshold: 55,
      action: "swap_to_usdc",
      amountPercent: 10,
      cadenceHours: 24,
      enabled: true,
    },
    {
      id: "rule-drypowder",
      label: "Keep dry powder",
      asset: "USDC",
      comparator: "lt",
      threshold: 20,
      action: "swap_to_usdc",
      amountPercent: 5,
      cadenceHours: 12,
      enabled: true,
    },
  ];
}

export function getMockIdentity(): AgentIdentity {
  return {
    ensName: "guard.portfolioguard.eth",
    avatar: "PG",
    description: "Autonomous Sepolia portfolio agent with 0G memory and Uniswap execution.",
    skills: ["rebalance", "risk controls", "ENS records", "activity proofs"],
    successRate: "97.8%",
    lastAction: "Rotated 8% ETH into USDC after threshold breach.",
  };
}

export function getMockStatus(): AgentStatus {
  const now = new Date();
  return {
    network: "0G Galileo Testnet",
    state: "online",
    lastCheckedAt: subMinutes(now, 4).toISOString(),
    nextCheckAt: addMinutes(now, 16).toISOString(),
    memoryKey: "0g://portfolio-guard/guard.portfolioguard.eth/memory/latest",
  };
}

export function getMockActivity(): ActivityItem[] {
  const now = new Date();
  return [
    {
      id: "act-1",
      type: "swap",
      title: "Executed rebalance on Uniswap V3",
      detail: "Swapped 0.12 ETH to 286.4 USDC on Sepolia.",
      reasoning:
        "ETH allocation exceeded the 55% guardrail, so the execution agent trimmed exposure back toward target.",
      timestamp: subMinutes(now, 18).toISOString(),
      txHash: "0x1a2b3c4d5e6f7080910111213141516171819202122232425262728293031323",
      explorerUrl:
        "https://sepolia.etherscan.io/tx/0x1a2b3c4d5e6f7080910111213141516171819202122232425262728293031323",
      storageReceipt: "0g://portfolio-guard/logs/act-1",
      status: "completed",
    },
    {
      id: "act-2",
      type: "analysis",
      title: "0G compute analysis completed",
      detail: "Volatility cooled and stablecoin buffer remains healthy.",
      reasoning:
        "Analysis agent ingested token balances, mock pricing, and user rules before handing off to decision agent.",
      timestamp: subMinutes(now, 22).toISOString(),
      storageReceipt: "0g://portfolio-guard/logs/act-2",
      status: "completed",
    },
    {
      id: "act-3",
      type: "ens",
      title: "Updated ENS agent records",
      detail: "Set success-rate and last-action text records for guard.portfolioguard.eth.",
      reasoning:
        "Identity agent keeps the ENS profile fresh so the dashboard and explorers reflect recent agent behavior.",
      timestamp: addHours(now, -7).toISOString(),
      storageReceipt: "0g://portfolio-guard/logs/act-3",
      status: "completed",
    },
  ];
}
