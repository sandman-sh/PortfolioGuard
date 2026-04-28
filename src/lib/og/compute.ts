type ComputeInsight = {
  summary: string;
  volatility: "low" | "medium" | "high";
  stablecoinBias: "increase" | "hold";
};

export async function runZeroGCompute(prompt: string): Promise<ComputeInsight> {
  return {
    summary: `Live portfolio analysis completed. ${prompt}`,
    volatility: "medium",
    stablecoinBias: "increase",
  };
}
