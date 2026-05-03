import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { ActivityItem } from "@/types/activity";
import type { AgentIdentity, AgentMessage, AgentStatus } from "@/types/agent";
import type { PortfolioSnapshot } from "@/types/portfolio";
import type { PortfolioRule } from "@/types/rules";

type MemoryState = {
  portfolio: PortfolioSnapshot;
  rules: PortfolioRule[];
  activity: ActivityItem[];
  identity: AgentIdentity;
  status: AgentStatus;
  messages: AgentMessage[];
};

type PersistedState = Record<string, MemoryState>;

import os from "node:os";

const STATE_DIR = process.env.VERCEL ? path.join(os.tmpdir(), ".portfolio-guard") : path.join(process.cwd(), ".portfolio-guard");
const STATE_FILE = path.join(STATE_DIR, "state.json");

function getStateKey(address?: string) {
  return (address?.toLowerCase() ?? "guest") as string;
}

function createDefaultState(address?: string): MemoryState {
  const walletAddress = address && /^0x[a-fA-F0-9]{40}$/.test(address) ? (address as `0x${string}`) : "";

  return {
    portfolio: {
      address: walletAddress,
      totalUsd: 0,
      totalChange24h: 0,
      tokens: [],
      updatedAt: new Date().toISOString(),
    },
    rules: [],
    activity: [],
    identity: {
      ensName: walletAddress || "Unassigned",
      avatar: "PG",
      description: "Agent profile for live Sepolia monitoring and wallet-approved execution.",
      skills: ["Live balance reads", "Rule-based rebalancing", "Wallet-routed swaps"],
      successRate: "N/A",
      lastAction: "No actions recorded yet.",
    },
    status: {
      network: "Ethereum Sepolia",
      state: "online",
      lastCheckedAt: new Date().toISOString(),
      nextCheckAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      memoryKey: `local://portfolio-guard/${walletAddress || "guest"}`,
    },
    messages: [
      {
        id: "msg-welcome",
        role: "assistant",
        content:
          "I am monitoring your Sepolia portfolio. Ask for an allocation view, a rebalance plan, or update your guardrails.",
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

function ensureStateFile() {
  if (!existsSync(STATE_DIR)) {
    mkdirSync(STATE_DIR, { recursive: true });
  }

  if (!existsSync(STATE_FILE)) {
    writeFileSync(STATE_FILE, JSON.stringify({}, null, 2), "utf8");
  }
}

function readAllState(): PersistedState {
  ensureStateFile();

  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8")) as PersistedState;
  } catch {
    return {};
  }
}

function writeAllState(state: PersistedState) {
  ensureStateFile();
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

export function getMemoryState(address?: string): MemoryState {
  const state = readAllState();
  const key = getStateKey(address);

  if (!state[key]) {
    state[key] = createDefaultState(address);
    writeAllState(state);
  }

  return state[key];
}

export function setMemoryState(address: string | undefined, updater: (current: MemoryState) => MemoryState) {
  const state = readAllState();
  const key = getStateKey(address);
  const current = state[key] ?? createDefaultState(address);
  state[key] = updater(current);
  writeAllState(state);
  return state[key];
}
