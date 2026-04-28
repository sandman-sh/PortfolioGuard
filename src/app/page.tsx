import { FeaturesGrid } from "@/components/landing/features-grid";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LiveDemo } from "@/components/landing/live-demo";

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <LiveDemo />
      <footer className="border-t border-white/10 bg-black/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-lg font-semibold text-white">PortfolioGuard.eth</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Autonomous DeFi portfolio management with ENS identity, 0G memory, and Sepolia execution.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground md:justify-end">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-primary">
              GitHub
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="transition hover:text-primary">
              Discord
            </a>
            <a
              href="https://docs.0g.ai/developer-hub/testnet/testnet-overview"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-primary"
            >
              0G Docs
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
