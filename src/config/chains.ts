import { defineChain } from "viem";
import { sepolia } from "viem/chains";

export const zeroGGalileo = defineChain({
  id: 16601,
  name: "0G Galileo Testnet",
  nativeCurrency: {
    name: "0G",
    symbol: "OG",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_0G_RPC_URL ?? "https://evmrpc-testnet.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Explorer",
      url: "https://chainscan-galileo.0g.ai",
    },
  },
  testnet: true,
});

export const supportedChains = [sepolia];
