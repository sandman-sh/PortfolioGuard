"use client";

import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";

export function usePortfolio() {
  const { address } = useAccount();
  const setPortfolio = usePortfolioGuardStore((state) => state.setPortfolio);
  const setActivity = usePortfolioGuardStore((state) => state.setActivity);
  const setStatus = usePortfolioGuardStore((state) => state.setStatus);
  const setIdentity = usePortfolioGuardStore((state) => state.setIdentity);
  const setRules = usePortfolioGuardStore((state) => state.setRules);
  const setMessages = usePortfolioGuardStore((state) => state.setMessages);

  return useQuery({
    queryKey: ["portfolio", address ?? "disconnected"],
    queryFn: async () => {
      const params = address ? `?address=${address}` : "";
      const response = await fetch(`/api/portfolio${params}`, { cache: "no-store" });
      const data = await response.json();
      setPortfolio(data.portfolio);
      setActivity(data.activity);
      setStatus(data.status);
      setIdentity(data.identity);
      setRules(data.rules ?? []);
      setMessages(data.messages ?? []);
      return data;
    },
  });
}
