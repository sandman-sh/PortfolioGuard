export type ActivityItem = {
  id: string;
  type: "analysis" | "decision" | "swap" | "ens" | "rule";
  title: string;
  detail: string;
  reasoning: string;
  timestamp: string;
  txHash?: `0x${string}`;
  explorerUrl?: string;
  storageReceipt?: string;
  status: "completed" | "pending" | "simulated";
};
