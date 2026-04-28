import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { getMemoryState, setMemoryState } from "@/lib/storage";

function sanitizeLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 32);
}

export async function registerSubname(label: string, address?: `0x${string}`) {
  const client = createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  });

  const normalizedLabel = sanitizeLabel(label) || "agent";
  const resolvedEnsName = address ? await client.getEnsName({ address }).catch(() => null) : null;
  const identityName = resolvedEnsName ?? `${normalizedLabel}.agent`;

  setMemoryState(address, (current) => ({
    ...current,
    identity: {
      ...current.identity,
      ensName: identityName,
      description:
        resolvedEnsName !== null
          ? `Wallet-linked ENS identity for ${resolvedEnsName}.`
          : `Agent alias for live Sepolia monitoring and execution.`,
      successRate: current.identity.successRate,
      lastAction: "Agent identity profile updated.",
    },
    activity: [
      {
        id: crypto.randomUUID(),
        type: "ens",
        title: resolvedEnsName ? "Wallet ENS profile linked" : "Agent alias updated",
        detail: resolvedEnsName
          ? `Linked the connected wallet to ENS name ${resolvedEnsName}.`
          : `Saved local agent alias ${identityName}.`,
        reasoning:
          resolvedEnsName !== null
            ? "The dashboard resolved the connected wallet's ENS profile on Sepolia and attached it to the agent."
            : "No live ENS record was available for the connected wallet, so the app saved a local alias instead.",
        timestamp: new Date().toISOString(),
        status: "completed",
        storageReceipt: `local://portfolio-guard/identity/${normalizedLabel}`,
      },
      ...current.activity,
    ],
  }));

  const memory = getMemoryState(address);
  return {
    ensName: identityName,
    identity: memory.identity,
    activity: memory.activity,
    simulated: false,
  };
}
