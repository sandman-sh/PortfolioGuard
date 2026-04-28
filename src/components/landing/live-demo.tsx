import Link from "next/link";
import { ArrowUpRight, Bot, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LiveDemo() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="glass-panel neon-border overflow-hidden rounded-lg">
          <div className="border-b border-white/8 px-6 py-5">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Live Demo</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Show the complete loop in a fast, product-grade walkthrough.
            </h2>
          </div>
          <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="rounded-lg border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(0,255,157,0.18),transparent_24%),linear-gradient(180deg,rgba(10,15,15,0.96),rgba(5,8,8,0.96))] p-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Bot className="h-4 w-4 text-primary" />
                  Agent replay console
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">90s flow</span>
              </div>
              <div className="space-y-3 pt-5">
                {[
                  "Connect wallet on Sepolia and hydrate balances.",
                  "Register guard identity and publish ENS text records.",
                  "Ask for a 60/40 ETH to USDC rebalance.",
                  "Review rationale, route, and slippage before execution.",
                  "Execute and surface the Sepolia transaction link.",
                ].map((line, index) => (
                  <div key={line} className="flex gap-4 rounded-lg border border-white/8 bg-black/20 px-4 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-primary">
                      0{index + 1}
                    </div>
                    <p className="text-sm leading-6 text-white">{line}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/8 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Demo checklist
                </div>
                <div className="mt-4 space-y-3 text-sm text-white">
                  <div className="flex items-center justify-between gap-3">
                    <span>Reasoning shown first</span>
                    <span className="text-primary">Yes</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Swap path visible</span>
                    <span className="text-primary">Yes</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Proof links logged</span>
                    <span className="text-primary">Yes</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/4 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Wallet className="h-4 w-4 text-primary" />
                  Launch sequence
                </div>
                <p className="mt-3 text-sm leading-6 text-white">
                  The walkthrough moves from identity to decision to execution with no dead-end screens and no hidden state.
                </p>
              </div>
              <Button asChild className="w-full">
                <Link href="/app">
                  Try Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="glass-panel neon-border rounded-lg p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">Presenter Notes</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Under two minutes, with enough proof to feel real.</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Connect wallet, claim an ENS identity, stage a rebalance, and execute a real Sepolia swap while the reasoning and logs stay visible.
            </p>
          </div>
          <div className="glass-panel neon-border rounded-lg p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">What the viewer understands</p>
            <div className="mt-4 space-y-4 text-sm text-white">
              <p>The agent has a clear identity.</p>
              <p>Policy and natural-language control coexist cleanly.</p>
              <p>Every action routes through visible reasoning and testnet execution.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
