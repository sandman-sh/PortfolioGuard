"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { toast } from "sonner";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export function useAgent() {
  const queryClient = useQueryClient();
  const { address, chainId } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const appendMessage = usePortfolioGuardStore((state) => state.appendMessage);
  const setLastDecision = usePortfolioGuardStore((state) => state.setLastDecision);
  const setActivity = usePortfolioGuardStore((state) => state.setActivity);
  const setStatus = usePortfolioGuardStore((state) => state.setStatus);
  const setMessages = usePortfolioGuardStore((state) => state.setMessages);
  const lastDecision = usePortfolioGuardStore((state) => state.lastDecision);

  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      appendMessage({
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      });

      const response = await fetch("/api/agent/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, address }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(data.messages);
      setLastDecision(data.decision);
      setActivity(data.activity);
      setStatus(data.status);
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const execute = useMutation({
    mutationFn: async () => {
      if (!address || !walletClient || !publicClient || !lastDecision || lastDecision.recommendedAction.type !== "swap") {
        throw new Error("A connected wallet and staged swap are required.");
      }

      const response = await fetch("/api/swap/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenIn: lastDecision.recommendedAction.tokenIn,
          tokenOut: lastDecision.recommendedAction.tokenOut,
          amountUsd: lastDecision.recommendedAction.amountUsd,
          recipient: address,
        }),
      });

      const quote = await response.json();
      if (!response.ok) {
        throw new Error(quote.error ?? "Unable to build a live swap quote.");
      }

      const hash = await walletClient.sendTransaction({
        account: address,
        chain: walletClient.chain,
        to: quote.methodParameters.to,
        data: quote.methodParameters.calldata,
        value: BigInt(quote.methodParameters.value),
      });

      await publicClient.waitForTransactionReceipt({ hash });

      const executeResponse = await fetch("/api/agent/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          txHash: hash,
          amountUsd: lastDecision.recommendedAction.amountUsd,
          tokenIn: lastDecision.recommendedAction.tokenIn,
          tokenOut: lastDecision.recommendedAction.tokenOut,
          explorerUrl: `https://sepolia.etherscan.io/tx/${hash}`,
          chainId,
        }),
      });

      return executeResponse.json();
    },
    onSuccess: (data) => {
      setLastDecision(data.decision);
      setActivity(data.activity);
      setStatus(data.status);
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Swap executed on Sepolia.");
    },
  });

  return {
    sendMessage: sendMessage.mutateAsync,
    isSending: sendMessage.isPending,
    executeDecision: execute.mutateAsync,
    isExecuting: execute.isPending,
  };
}
