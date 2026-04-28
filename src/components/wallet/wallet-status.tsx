"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { truncateAddress } from "@/lib/format";

export function WalletStatus() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <div className="rounded-lg border border-white/8 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Wallet access</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Connect a Sepolia wallet to unlock your live balances, saved agent profile, and wallet-triggered swaps.
              </p>
              <div className="mt-4">
                <Button onClick={openConnectModal}>Connect Wallet</Button>
              </div>
            </div>
          );
        }

        if (chain.unsupported) {
          return (
            <div className="rounded-lg border border-amber-400/20 bg-amber-400/10 p-5">
              <div className="flex items-center gap-2 text-sm text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                Switch to Sepolia before using identity tools or swap execution.
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button variant="secondary" onClick={openChainModal}>
                  Wrong Network
                </Button>
                <Button variant="outline" onClick={openAccountModal}>
                  {account.displayName}
                </Button>
              </div>
            </div>
          );
        }

        return (
          <div className="rounded-lg border border-white/8 bg-black/20 p-5">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-white/8 bg-white/4 px-4 py-4 text-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Network</div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="success">Sepolia</Badge>
                </div>
              </div>
              <button
                type="button"
                onClick={openAccountModal}
                className="rounded-lg border border-white/8 bg-white/4 px-4 py-4 text-left text-sm transition hover:bg-white/6"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Wallet</div>
                <div className="mt-2 font-medium text-white">{truncateAddress(account.address)}</div>
              </button>
              <div className="rounded-lg border border-white/8 bg-white/4 px-4 py-4 text-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Balance</div>
                <div className="mt-2 font-medium text-white">{account.displayBalance ?? "Connected"}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="secondary" onClick={openChainModal}>
                {chain.name}
              </Button>
              <Button variant="outline" onClick={openAccountModal}>
                Manage Wallet
              </Button>
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
