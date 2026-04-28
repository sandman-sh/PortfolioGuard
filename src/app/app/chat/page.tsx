"use client";

import { usePortfolio } from "@/hooks/use-portfolio";
import { useRules } from "@/hooks/use-rules";
import { AgentChat } from "@/components/chat/agent-chat";

export default function ChatPage() {
  usePortfolio();
  useRules();
  return <AgentChat />;
}
