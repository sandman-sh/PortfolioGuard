"use client";

import { useSyncExternalStore } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts";
import type { PortfolioSnapshot } from "@/types/portfolio";

export function AllocationChart({ portfolio }: { portfolio: PortfolioSnapshot | null }) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="h-64 w-full rounded-lg border border-white/10 bg-white/5" />;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={portfolio?.tokens ?? []} dataKey="allocation" nameKey="symbol" innerRadius={72} outerRadius={100}>
            {(portfolio?.tokens ?? []).map((token) => (
              <Cell key={token.symbol} fill={token.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#0b1110", border: "1px solid rgba(255,255,255,0.1)" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
