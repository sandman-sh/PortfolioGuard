export type TokenAllocation = {
  symbol: string;
  name: string;
  balance: number;
  usdValue: number;
  priceUsd: number;
  allocation: number;
  change24h: number;
  color: string;
};

export type PortfolioSnapshot = {
  address: `0x${string}` | "";
  totalUsd: number;
  totalChange24h: number;
  tokens: TokenAllocation[];
  updatedAt: string;
};
