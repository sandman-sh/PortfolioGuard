export type PortfolioRule = {
  id: string;
  label: string;
  asset: string;
  comparator: "gt" | "lt";
  threshold: number;
  action: "swap_to_usdc" | "swap_to_eth" | "notify_only" | "compound";
  amountPercent: number;
  cadenceHours: number;
  enabled: boolean;
};
