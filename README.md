<div align="center">
  <h1>🛡️ PortfolioGuard.eth</h1>
  <p><strong>Autonomous Onchain Portfolio Manager with Human-in-the-Loop Execution</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
</div>

<hr />

PortfolioGuard.eth is a cutting-edge DeFi application built on Next.js 16 designed for managing a Sepolia testnet portfolio through an intelligent, agent-driven workflow. It seamlessly bridges wallet-linked identity, real-time portfolio monitoring, rule-based automation, and live Uniswap Sepolia execution into a unified, secure product experience.

## ✨ Core Capabilities

- 🔐 **Secure Wallet Connection**: Protected application shell with wallet-linked identity profiles.
- 📊 **Real-time Analytics**: Comprehensive portfolio overview, allocation charts, and historical activity tracking.
- 💬 **Intelligent Chat Interface**: Natural-language agent interaction with transparent, reasoning-first responses.
- ⚙️ **Rule-Based Automation**: Create rules and maintain persistent local agent state for autonomous operation.
- 💱 **Live Execution**: Direct Uniswap Sepolia quotes and execution flows, fully transparent and user-approved.

## 🛠️ Technology Stack

Our robust stack ensures high performance, security, and developer experience:

- **Frontend Framework**: Next.js `16.2.4` (App Router), React `19.2.4`
- **Language**: TypeScript `5`
- **Styling**: Tailwind CSS `4`
- **Web3 Integration**: Wagmi, Viem, RainbowKit, and Ethers.js
- **State Management**: TanStack Query and Zustand
- **Data Visualization**: Recharts
- **DeFi Integration**: Uniswap V3 SDK and Smart Order Router

## 📂 Project Structure

```text
src/
├── app/                 # App Router pages, layouts, and API routes
├── components/          # Reusable feature and UI components
├── config/              # Chain, token, and application configuration
├── hooks/               # Custom React hooks for business logic
├── lib/                 # Core domain logic (Agent, ENS, 0G, Wallet, Swaps)
├── providers/           # App-level context providers
├── store/               # Zustand client state store
└── types/               # Shared TypeScript interfaces and types
contracts/
└── AgentWallet.sol      # Smart contract source files
docs/                    # Project documentation and specifications
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured:
- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm` or `yarn`
- A [WalletConnect](https://walletconnect.com/) Project ID
- Access to an Ethereum Sepolia RPC endpoint

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure your environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Update the `.env.local` file with your specific configuration details (see [Environment Variables](#-environment-variables)).*

### Local Development

Start the development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Quality Checks

Maintain code quality with built-in scripts:
```bash
npm run lint
npm run typecheck
```

## 🔐 Environment Variables

The application requires several environment variables to function correctly. 

**Required:**
- `NEXT_PUBLIC_SEPOLIA_RPC_URL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_0G_RPC_URL`
- `NEXT_PUBLIC_AGENT_WALLET_ADDRESS`

**Optional (For 0G Integration):**
- `OG_STORAGE_ENABLED`
- `OG_COMPUTE_ENABLED`
- `OG_STORAGE_RPC_URL`
- `OG_COMPUTE_ENDPOINT`

> **Note:** The current implementation executes Sepolia swaps through the connected wallet. Local development state (rules, identity, messages) is safely persisted in `.portfolio-guard/state.json`.

## 🛤️ Product Workflow

1. **Launch**: Open the application landing page.
2. **Connect**: Link your Web3 wallet on the Ethereum Sepolia network.
3. **Configure**: Set up your agent identity profile.
4. **Monitor**: Review real-time portfolio data and historical activity.
5. **Automate**: Define custom portfolio management rules in the settings module.
6. **Interact**: Use the chat interface to request portfolio rebalancing or specific actions.
7. **Execute**: Review the agent's reasoning and safely execute the proposed transaction from your connected wallet.

## 🔗 Integration Notes

- **0G Network**: Wrappers for 0G storage and compute integration are available in `src/lib/og/`. Currently acting as extension points for future development.
- **Uniswap**: Direct swap quoting and execution logic is located in `src/lib/uniswap/`, returning router calldata for secure wallet-based transaction submission.

## 📚 Documentation

- [ETHGlobal Submission Notes](./docs/ethglobal-submission.md)
- [UI Specification](./docs/ui-spec.md)

## ☁️ Deployment

PortfolioGuard.eth is optimized for seamless deployment on [Vercel](https://vercel.com/) or any platform supporting Next.js App Router applications. For production environments, ensure you replace the local file-based persistence layer with a robust, cloud-native database solution.

---
*Built with precision for the future of decentralized finance.*
