"use client";

import {
  ActivitySquare,
  Bot,
  PieChart,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
  LogOut,
  ChevronRight,
  Menu
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { WalletStatus } from "@/components/wallet/wallet-status";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/app", label: "Dashboard", icon: Shield },
  { href: "/app/chat", label: "Agent Console", icon: Bot },
  { href: "/app/portfolio", label: "Portfolio", icon: PieChart },
  { href: "/app/activity", label: "Audit Trail", icon: ActivitySquare },
  { href: "/app/settings", label: "Settings", icon: SlidersHorizontal },
];

const pageMeta: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  "/app": {
    eyebrow: "Overview",
    title: "Command Center",
    description: "Monitor agent activity, review portfolio balances, and authorize pending actions.",
  },
  "/app/chat": {
    eyebrow: "Interaction",
    title: "Agent Console",
    description: "Communicate directly with the autonomous portfolio manager.",
  },
  "/app/portfolio": {
    eyebrow: "Analytics",
    title: "Portfolio Status",
    description: "Deep dive into your current allocations and target deviations.",
  },
  "/app/activity": {
    eyebrow: "History",
    title: "Audit Trail",
    description: "Verifiable record of every automated decision and executed swap.",
  },
  "/app/settings": {
    eyebrow: "Configuration",
    title: "Policy Settings",
    description: "Define boundaries, risk limits, and rebalancing parameters.",
  },
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/app"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-border bg-card/40 backdrop-blur-xl lg:flex">
          <div className="flex h-16 items-center px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80">
              <ShieldCheck className="h-5 w-5 text-primary" />
              PortfolioGuard
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
            <div className="space-y-1">
              <div className="px-2 text-xs font-medium text-muted-foreground mb-2">Workspace</div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        {item.label}
                      </div>
                      {active && <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,157,0.8)]" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-4 px-2">
              <div className="text-xs font-medium text-muted-foreground">System Status</div>
              <div className="rounded-xl border border-border bg-background/50 p-3 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    Live Sync
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase border-primary/30 text-primary bg-primary/5">Connected</Badge>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-border/50">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Network</span>
                    <span className="text-foreground font-medium">Sepolia</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Engine</span>
                    <span className="text-foreground font-medium">Uniswap V3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-border mt-auto">
             <div className="flex items-center gap-3 rounded-lg border border-border bg-background/50 p-3 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Defense Active</p>
                  <p className="text-xs text-muted-foreground truncate">0.5% max slippage</p>
                </div>
             </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md lg:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              PortfolioGuard
            </Link>
            <div className="flex items-center gap-2">
              <WalletStatus />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-10">
              {/* Page Header */}
              <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {meta.eyebrow}
                    </span>
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-border bg-muted/50 text-muted-foreground">Testnet</Badge>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {meta.title}
                  </h1>
                  <p className="text-base text-muted-foreground max-w-2xl mt-2">
                    {meta.description}
                  </p>
                </div>
                
                <div className="hidden lg:block shrink-0">
                  <WalletStatus />
                </div>
              </div>
              
              <Separator className="mb-8 opacity-50" />

              {/* Dynamic Content */}
              <main className="min-h-[50vh]">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
