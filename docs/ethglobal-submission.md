# ETHGlobal Submission Copy

## Project
PortfolioGuard.eth

## One-liner
PortfolioGuard is an autonomous onchain DeFi portfolio manager with its own ENS identity, powered by 0G dAIOS and executing rebalances on Uniswap Sepolia.

## What it does
Users connect a Sepolia wallet, assign an ENS identity to their agent, define portfolio rules, and chat with the agent in natural language. A three-part agent swarm analyzes market conditions, reads stored memory and rules from 0G, and executes real or simulation-backed Uniswap V3 swaps on Sepolia with transparent reasoning.

## Sponsor Usage

### 0G
- Used `@0glabs/0g-ts-sdk` integration points for persistent agent memory.
- Used `@0glabs/0g-serving-broker` integration points for analysis-agent inference.
- Every rule update, decision, and swap activity is modeled as verifiable agent memory.

### Uniswap Foundation
- Uses Uniswap routing and execution abstractions on Sepolia.
- Agent prepares swap intent with 0.5% slippage and 20 minute deadline.
- Activity feed surfaces transaction hash and Sepolia explorer link.

### ENS
- Agent identity is represented by an ENS-style subname such as `guard.portfolioguard.eth`.
- UI models text records for `description`, `skills`, `success-rate`, and `last-action`.
- ENS identity is visible across the dashboard and activity system.

## Why it matters
Most portfolio tools stop at dashboards. PortfolioGuard turns a wallet into an agent-operated account with memory, identity, and action rails, while keeping the human in the loop through explicit reasoning and testnet-safe execution.
