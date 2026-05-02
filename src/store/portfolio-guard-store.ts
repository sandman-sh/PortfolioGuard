"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActivityItem } from "@/types/activity";
import type { AgentDecision, AgentIdentity, AgentMessage, AgentStatus } from "@/types/agent";
import type { PortfolioSnapshot } from "@/types/portfolio";
import type { PortfolioRule } from "@/types/rules";

type StoreState = {
  portfolio: PortfolioSnapshot | null;
  rules: PortfolioRule[];
  activity: ActivityItem[];
  status: AgentStatus | null;
  identity: AgentIdentity | null;
  messages: AgentMessage[];
  lastDecision: AgentDecision | null;
  setPortfolio: (portfolio: PortfolioSnapshot) => void;
  setRules: (rules: PortfolioRule[]) => void;
  setActivity: (activity: ActivityItem[]) => void;
  setStatus: (status: AgentStatus) => void;
  setIdentity: (identity: AgentIdentity) => void;
  setMessages: (messages: AgentMessage[]) => void;
  appendMessage: (message: AgentMessage) => void;
  clearMessages: () => void;
  setLastDecision: (decision: AgentDecision | null) => void;
};

export const usePortfolioGuardStore = create<StoreState>()(
  persist(
    (set) => ({
      portfolio: null,
      rules: [],
      activity: [],
      status: null,
      identity: null,
      messages: [],
      lastDecision: null,
      setPortfolio: (portfolio) => set({ portfolio }),
      setRules: (rules) => set({ rules }),
      setActivity: (activity) => set({ activity }),
      setStatus: (status) => set({ status }),
      setIdentity: (identity) => set({ identity }),
      setMessages: (messages) => set({ messages }),
      appendMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [], lastDecision: null }),
      setLastDecision: (lastDecision) => set({ lastDecision }),
    }),
    {
      name: "portfolio-guard-storage",
    }
  )
);
