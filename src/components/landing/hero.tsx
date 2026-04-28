"use client";

import {
  Activity,
  ArrowRight,
  Bot,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { appConfig } from "@/config/app";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const badges = ["0G", "Uniswap", "ENS", "Sepolia Testnet"];
const stats = [
  { label: "Execution venue", value: "Uniswap V3 / Sepolia" },
  { label: "Agent runtime", value: "0G Galileo swarm" },
  { label: "Policy model", value: "Rules + natural language" },
];

const activityFeed = [
  {
    label: "Market posture",
    value: "ETH overweight by 6.2%",
    detail: "Analysis agent flagged drift against target mix",
    icon: TrendingUp,
  },
  {
    label: "Next action",
    value: "Route 10% ETH into USDC",
    detail: "Decision agent staged a conservative rebalance",
    icon: ShieldCheck,
  },
  {
    label: "Memory checkpoint",
    value: "0g://portfolio-guard/rules/latest",
    detail: "Rules, snapshots, and action history persisted",
    icon: Bot,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen border-b border-white/5 bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,157,0.03),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="z-20 flex items-center justify-between rounded-2xl bg-white/[0.02] px-6 py-4 backdrop-blur-md border border-white/[0.05]">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              {appConfig.name}
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex bg-primary/10 text-primary hover:bg-primary/20 border-none">
              Live on Testnet
            </Badge>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          </nav>
          <Button size="sm" className="rounded-full px-6" asChild>
            <Link href="/app">
              Launch App
            </Link>
          </Button>
        </header>

        <div className="grid flex-1 items-center gap-16 py-16 lg:grid-cols-2 lg:py-24">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Autonomous treasury defense for DeFi
            </div>
            
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.1]">
              DeFi defense on <span className="text-primary">autopilot.</span>
            </h1>
            
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {appConfig.tagline}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                <Link href="/app">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5" asChild>
                <a href="#demo">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Demo
                </a>
              </Button>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-sm font-medium text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent opacity-50 blur-xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                    <div className="h-3 w-3 rounded-full bg-white/10" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground ml-2">Guard Console Preview</span>
                </div>
                <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 text-[10px] uppercase tracking-wider px-2 py-0.5">
                  Online
                </Badge>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-xs text-muted-foreground mb-2">Guard Status</p>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <p className="text-lg font-medium text-white">Monitoring</p>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-xs text-muted-foreground mb-3">Target Mix</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">ETH</span>
                        <span className="text-muted-foreground">60%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[60%] bg-primary" />
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-white">USDC</span>
                        <span className="text-muted-foreground">40%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-[40%] bg-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
                  {activityFeed.map((item, i) => (
                    <div key={item.label} className={`flex items-start gap-4 p-4 ${i !== activityFeed.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <div className="rounded-lg bg-white/5 p-2 text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-0.5">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
