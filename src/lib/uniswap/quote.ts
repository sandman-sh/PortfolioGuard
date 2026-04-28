import { createRequire } from "node:module";
import { createPublicClient, encodeFunctionData, formatUnits, http, parseEther } from "viem";
import { sepolia } from "viem/chains";
import { trackedTokens } from "@/config/tokens";

const require = createRequire(import.meta.url);
const { CHAIN_TO_ADDRESSES_MAP } = require("@uniswap/sdk-core") as typeof import("@uniswap/sdk-core");

type SwapQuoteRequest = {
  tokenIn: string;
  tokenOut: string;
  amountUsd: number;
  recipient: `0x${string}`;
};

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

const swapRouterAbi = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
] as const;

function getClient() {
  return createPublicClient({
    chain: sepolia,
    transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
  });
}

async function quoteWethToUsdc(amountIn: bigint) {
  const client = getClient();
  const addresses = CHAIN_TO_ADDRESSES_MAP[11155111];
  const fees = [500, 3000, 10000] as const;

  for (const fee of fees) {
    try {
      const result = (await client.readContract({
        address: addresses.quoterAddress as `0x${string}`,
        abi: quoterAbi,
        functionName: "quoteExactInputSingle",
        args: [
          {
            tokenIn: trackedTokens[2].address as `0x${string}`,
            tokenOut: trackedTokens[1].address as `0x${string}`,
            amountIn,
            fee,
            sqrtPriceLimitX96: BigInt(0),
          },
        ],
      })) as readonly [bigint, bigint, number, bigint];
      const amountOut = result[0];
      const gasEstimate = result[3];

      if (amountOut > BigInt(0)) {
        return { amountOut, fee, gasEstimate };
      }
    } catch {
      continue;
    }
  }

  throw new Error("Unable to quote an ETH to USDC route on Sepolia.");
}

async function getNativeUsdPrice() {
  const probeIn = parseEther("0.01");
  const result = await quoteWethToUsdc(probeIn);
  return Number(formatUnits(result.amountOut, 6)) / 0.01;
}

export async function getSwapQuote({ tokenIn, tokenOut, amountUsd, recipient }: SwapQuoteRequest) {
  if (tokenIn !== "ETH" || tokenOut !== "USDC") {
    throw new Error("Only ETH to USDC swaps are supported right now.");
  }

  const addresses = CHAIN_TO_ADDRESSES_MAP[11155111];
  const nativeUsdPrice = await getNativeUsdPrice();
  const exactInputEth = Math.max(amountUsd / nativeUsdPrice, 0.00001);
  const amountInWei = parseEther(exactInputEth.toFixed(18));
  const quote = await quoteWethToUsdc(amountInWei);
  const amountOutMinimum = (quote.amountOut * BigInt(9950)) / BigInt(10000);

  const calldata = encodeFunctionData({
    abi: swapRouterAbi,
    functionName: "exactInputSingle",
    args: [
      {
        tokenIn: trackedTokens[2].address as `0x${string}`,
        tokenOut: trackedTokens[1].address as `0x${string}`,
        fee: quote.fee,
        recipient,
        amountIn: amountInWei,
        amountOutMinimum,
        sqrtPriceLimitX96: BigInt(0),
      },
    ],
  });

  return {
    tokenIn,
    tokenOut,
    amountUsd,
    amountIn: Number(exactInputEth.toFixed(6)),
    amountInWei: amountInWei.toString(),
    quoteOut: Number(formatUnits(quote.amountOut, 6)),
    quoteOutSymbol: "USDC",
    slippageBps: 50,
    deadlineMinutes: 20,
    route: `WETH/USDC ${quote.fee / 10000}%`,
    methodParameters: {
      to: addresses.swapRouter02Address as `0x${string}`,
      calldata,
      value: amountInWei.toString(),
    },
    estimatedGasUsed: quote.gasEstimate.toString(),
    estimatedGasUsedUsd: 0,
    blockNumber: "0",
    simulated: false,
  };
}
