import { Fingerprint, MessagesSquare, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Fingerprint,
    title: "Give your agent an ENS name",
    body: "Mint or attach a subname so your agent has a visible, updateable identity with text records.",
    note: "Identity becomes a first-class part of the product surface and audit trail.",
  },
  {
    icon: MessagesSquare,
    title: "Set rules or chat naturally",
    body: "Describe targets like 60/40 ETH-USDC or establish hard portfolio guardrails in a rules panel.",
    note: "The system supports both operator-defined policy and natural-language instructions.",
  },
  {
    icon: ShieldCheck,
    title: "0G agent watches and acts",
    body: "A mini-swarm analyses conditions, stores memory on 0G, and executes Uniswap swaps on Sepolia.",
    note: "Execution stays transparent with reasoning, timestamps, and proof-friendly logging.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">How It Works</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            A startup-grade flow from identity to automated execution.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            The product is designed like an operator console: visible identity, clear policy, and machine reasoning that stays legible before value moves.
          </p>
        </div>
        <div className="grid gap-4 xl:col-span-8">
          {steps.map((step, index) => (
            <div key={step.title} className="glass-panel neon-border rounded-lg p-5 md:p-6">
              <div className="grid gap-5 md:grid-cols-[80px_minmax(0,1fr)_220px] md:items-start">
                <div className="flex items-center gap-4 md:block">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/12 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Step {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
                </div>
                <div className="rounded-lg border border-white/8 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Operator value</p>
                  <p className="mt-3 text-sm leading-6 text-white">{step.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
