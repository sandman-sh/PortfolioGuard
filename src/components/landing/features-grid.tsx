import { Activity, Bot, CandlestickChart, Coins, Database, Shield } from "lucide-react";

const features = [
  {
    icon: Coins,
    title: "Wallet + ENS onboarding",
    body: "Connect MetaMask on Sepolia, attach an ENS subname, and surface agent identity everywhere.",
    eyebrow: "Identity layer",
    span: "xl:col-span-5",
  },
  {
    icon: CandlestickChart,
    title: "Portfolio intelligence",
    body: "Track ETH, WETH, and USDC balances with allocations, changes, and target drift.",
    eyebrow: "Portfolio lens",
    span: "xl:col-span-7",
  },
  {
    icon: Bot,
    title: "Chat-native agent control",
    body: "Ask for rebalances, risk shifts, or auto-compound decisions in natural language.",
    eyebrow: "Operator console",
    span: "xl:col-span-4",
  },
  {
    icon: Database,
    title: "0G memory + compute",
    body: "Persist rules, decisions, and snapshots to 0G while delegating analysis to compute.",
    eyebrow: "Memory plane",
    span: "xl:col-span-4",
  },
  {
    icon: Shield,
    title: "Rule-based automation",
    body: "Set thresholds like ETH > 55% and attach clear action policies with cadence control.",
    eyebrow: "Risk policy",
    span: "xl:col-span-4",
  },
  {
    icon: Activity,
    title: "Proof-rich activity log",
    body: "Every analysis, ENS update, and swap appears with timestamps, reasoning, and explorer links.",
    eyebrow: "Audit trail",
    span: "xl:col-span-12",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Features</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Everything you need for a crypto product that feels investable, not improvised.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground">
          PortfolioGuard pairs a familiar startup product surface with onchain execution rails, agent memory, and policy-driven automation.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12">
        {features.map((feature) => (
          <div key={feature.title} className={`glass-panel neon-border rounded-lg p-6 ${feature.span}`}>
            <div className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/12 text-primary">
                <feature.icon className="h-6 w-6" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{feature.eyebrow}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
