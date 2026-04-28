"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { Fingerprint, ShieldCheck, Sparkles, Stars } from "lucide-react";
import type { AgentIdentity } from "@/types/agent";
import { usePortfolioGuardStore } from "@/store/portfolio-guard-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EnsIdentityCard({ identity }: { identity: AgentIdentity | null }) {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const setIdentity = usePortfolioGuardStore((state) => state.setIdentity);
  const setActivity = usePortfolioGuardStore((state) => state.setActivity);
  const [subname, setSubname] = useState("guard");
  const [loading, setLoading] = useState(false);

  async function registerSubname() {
    setLoading(true);

    try {
      const response = await fetch("/api/ens/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: subname, address }),
      });
      const data = await response.json();
      setIdentity(data.identity);
      setActivity(data.activity ?? []);
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      toast.success(`Agent identity ready: ${data.ensName}`);
    } catch {
      toast.error("Could not register subname.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="bg-card/40 backdrop-blur-xl border-border/50 shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="border-b border-border/40 pb-4 bg-background/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Fingerprint className="h-24 w-24 text-primary" />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase tracking-wider font-semibold">
                <Fingerprint className="mr-1 h-3 w-3" />
                ENS Identity
              </Badge>
            </div>
            <CardTitle className="text-lg">Agent Profile</CardTitle>
            <CardDescription className="mt-1 line-clamp-1">
              Wallet-linked profile details and history.
            </CardDescription>
          </div>
          <Avatar className="h-12 w-12 border-2 border-primary/20 bg-primary/5 shrink-0">
            <AvatarFallback className="text-primary font-semibold text-sm">{identity?.avatar ?? "PG"}</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-5 flex-1">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 relative overflow-hidden">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Identity State
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground line-clamp-2">
            The app keeps a wallet-linked agent profile so your recent actions stay visible.
          </p>
        </div>
        
        <div className="overflow-hidden">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Primary Name</p>
          <p className="mt-1 text-xl font-bold text-foreground truncate" title={identity?.ensName ?? "Connect wallet to assign profile"}>
            {identity?.ensName ?? "Awaiting Profile"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {identity?.description ?? "Attach a wallet profile name to publish agent skills."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(identity?.skills?.length ? identity.skills : ["Defense", "Rebalancing", "Proofs"]).map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-background/50 border-border/50 text-xs font-normal">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="grid gap-3 grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-background/30 p-3 overflow-hidden">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Success Rate</p>
            <p className="mt-1 text-lg font-bold text-foreground truncate">{identity?.successRate ?? "--"}</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-background/30 p-3 overflow-hidden">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">Last Action</p>
            <p className="mt-1 text-sm font-medium text-foreground truncate" title={identity?.lastAction ?? "--"}>{identity?.lastAction ?? "--"}</p>
          </div>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-background/30 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
            <Stars className="h-4 w-4 text-primary" />
            Text Records
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div className="bg-background/40 p-2 rounded-lg border border-border/30">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">desc</p>
              <p className="text-xs font-medium truncate mt-0.5" title="Agent purpose">Agent purpose</p>
            </div>
            <div className="bg-background/40 p-2 rounded-lg border border-border/30">
              <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">skills</p>
              <p className="text-xs font-medium truncate mt-0.5" title="Strategy scope">Strategy scope</p>
            </div>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full mt-2 rounded-xl">
              <Sparkles className="mr-2 h-4 w-4" />
              Save Identity Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogTitle>Save agent identity</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Save a wallet-linked alias like <span className="font-medium text-foreground">{subname}.agent</span>.
            </DialogDescription>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile label</label>
                <Input className="bg-background/50 border-border/50" value={subname} onChange={(event) => setSubname(event.target.value)} />
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
                Saved name: <span className="font-semibold text-foreground">{subname}.agent</span>
              </div>
              <Button className="w-full rounded-xl" onClick={registerSubname} disabled={loading || !subname || !address}>
                {loading ? "Saving..." : "Save Identity"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
