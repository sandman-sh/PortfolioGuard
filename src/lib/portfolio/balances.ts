import { createRequire } from "node:module";
import { createPublicClient, erc20Abi, formatEther, formatUnits, http, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { trackedTokens } from "@/config/tokens";
import type { PortfolioSnapshot, TokenAllocation } from "@/types/portfolio";

const require = createRequire(import.meta.url);
const { CHAIN_TO_ADDRESSES_MAP } = require("@uniswap/sdk-core") as typeof import("@uniswap/sdk-core");

const quoterAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactInputSingle",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceX96After", type: "uint160" },
      { internalType: "uint32", name: "initializedTicksCrossed", type: "uint32" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

function getClient() {
  return createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL, {
      fetchOptions: { cache: "no-store" },
    }),
  });
}

async function quoteTokenToUsdc(tokenIn: `0x${string}`, amountIn: bigint) {
  const client = getClient();
  const quoterAddress = CHAIN_TO_ADDRESSES_MAP[11155111].quoterAddress as `0x${string}`;
  const fees = [500, 3000, 10000] as const;

  for (const fee of fees) {
    try {
      const result = (await client.readContract({
        address: quoterAddress,
        abi: quoterAbi,
        functionName: "quoteExactInputSingle",
        args: [
          {
            tokenIn,
            tokenOut: trackedTokens[1].address as `0x${string}`,
            amountIn,
            fee,
            sqrtPriceLimitX96: BigInt(0),
          },
        ],
      })) as readonly [bigint, bigint, number, bigint];
      const amountOut = result[0];

      if (amountOut > BigInt(0)) {
        return amountOut;
      }
    } catch {
      continue;
    }
  }

  return BigInt(0);
}

async function getPriceMap() {
  const [ethOut, wethOut] = await Promise.all([
    quoteTokenToUsdc(trackedTokens[2].address as `0x${string}`, parseEther("0.01")),
    quoteTokenToUsdc(trackedTokens[2].address as `0x${string}`, parseEther("0.01")),
  ]);

  return {
    ETH: Number(formatUnits(ethOut, 6)) / 0.01,
    USDC: 1,
    WETH: Number(formatUnits(wethOut, 6)) / 0.01,
  };
}

export async function fetchPortfolio(address?: `0x${string}`): Promise<PortfolioSnapshot> {
  if (!address) {
    return {
      address: "",
      totalUsd: 0,
      totalChange24h: 0,
      tokens: [],
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const client = getClient();
    const prices = await getPriceMap();
    const ethBalance = Number(formatEther(await client.getBalance({ address })));
    const tokenBalances = await Promise.all(
      trackedTokens
        .filter((token) => token.symbol !== "ETH")
        .map(async (token) => {
          const balance = await client.readContract({
            address: token.address as `0x${string}`,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          });
          return {
            ...token,
            rawBalance: balance,
          };
        }),
    );

    const normalized: TokenAllocation[] = [
      {
        symbol: "ETH",
        name: "Ether",
        balance: ethBalance,
        usdValue: Number((ethBalance * prices.ETH).toFixed(2)),
        priceUsd: prices.ETH,
        allocation: 0,
        change24h: 0,
        color: "#00ff9d",
      },
      ...tokenBalances.map((token) => {
        const balance = Number(formatUnits(token.rawBalance, token.decimals));
        const usdValue = balance * prices[token.symbol as keyof typeof prices];
        return {
          symbol: token.symbol,
          name: token.name,
          balance,
          usdValue: Number(usdValue.toFixed(2)),
          priceUsd: prices[token.symbol as keyof typeof prices],
          allocation: 0,
          change24h: 0,
          color: token.color,
        };
      }),
    ].filter((token) => token.balance > 0 || token.symbol === "ETH");

    const totalUsd = normalized.reduce((sum, token) => sum + token.usdValue, 0);
    normalized.forEach((token) => {
      token.allocation = totalUsd > 0 ? Number(((token.usdValue / totalUsd) * 100).toFixed(1)) : 0;
    });

    return {
      address,
      totalUsd: Number(totalUsd.toFixed(2)),
      totalChange24h: 0,
      tokens: normalized,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("fetchPortfolio error:", error);
    return {
      address,
      totalUsd: 0,
      totalChange24h: 0,
      tokens: [],
      updatedAt: new Date().toISOString(),
    };
  }
}
