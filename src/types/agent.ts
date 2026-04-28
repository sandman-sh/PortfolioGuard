import type { ActivityItem } from "@/types/activity";
import type { PortfolioSnapshot } from "@/types/portfolio";
import type { PortfolioRule } from "@/types/rules";

export type AgentIdentity = {
  ensName: string;
  avatar: string;
  description: string;
  skills: string[];
  successRate: string;
  lastAction: string;
};

export type AgentStatus = {
  network: string;
  state: "online" | "idle" | "executing";
  lastCheckedAt: string;
  nextCheckAt: string;
  memoryKey: string;
};

export type AgentMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type AgentDecision = {
  summary: string;
  reasoning: string[];
  recommendedAction:
    | {
        type: "swap";
        tokenIn: string;
        tokenOut: string;
        amountUsd: number;
        slippageBps: number;
      }
    | {
        type: "hold";
      };
  status: AgentStatus;
  portfolio: PortfolioSnapshot;
  rules: PortfolioRule[];
  activity: ActivityItem[];
};
