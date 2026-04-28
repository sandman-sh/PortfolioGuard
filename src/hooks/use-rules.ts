"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import type { PortfolioRule } from "@/types/rules";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export function useRules() {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const setRules = usePortfolioGuardStore((state) => state.setRules);

  const query = useQuery({
    queryKey: ["rules", address ?? "disconnected"],
    queryFn: async () => {
      const params = address ? `?address=${address}` : "";
      const response = await fetch(`/api/agent/rules${params}`, { cache: "no-store" });
      const data = await response.json();
      setRules(data.rules);
      return data.rules as PortfolioRule[];
    },
  });

  const mutation = useMutation({
    mutationFn: async (rules: PortfolioRule[]) => {
      const response = await fetch("/api/agent/rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rules, address }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      setRules(data.rules);
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success("Rules saved.");
    },
  });

  return { ...query, saveRules: mutation.mutateAsync, isSaving: mutation.isPending };
}
