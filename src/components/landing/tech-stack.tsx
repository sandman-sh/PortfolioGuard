const stack = [
  { title: "0G Storage + Serving Broker", detail: "Persistent memory and compute-backed analysis for the autonomous loop." },
  { title: "Uniswap V3 SDK + Smart Order Router", detail: "Route planning and testnet swap execution with explainable trade context." },
  { title: "ENS text records + subnames on Sepolia", detail: "Agent identity, persona metadata, and operator-visible branding." },
  { title: "Next.js 16 App Router", detail: "Fast route architecture for a landing page and control surface that feel cohesive." },
  { title: "Wagmi + viem + RainbowKit", detail: "Wallet connection, chain-awareness, and clean account interaction flows." },
  { title: "Tailwind CSS + Radix UI", detail: "A compact, high-contrast interface system tuned for crypto operations UI." },
];

export function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Tech Stack</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Purpose-built around the rails this product actually uses.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Identity, storage, inference, and swaps are treated as product infrastructure, not decorative sponsor mentions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stack.map((item) => (
            <div key={item.title} className="glass-panel neon-border rounded-lg p-6">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
            </div>
        ))}
        </div>
      </div>
    </section>
  );
}
