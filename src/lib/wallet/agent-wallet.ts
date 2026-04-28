export async function maybeDeployAgentWallet() {
  return {
    simulated: true,
    address: process.env.NEXT_PUBLIC_AGENT_WALLET_ADDRESS ?? "0x000000000000000000000000000000000000dEaD",
  };
}
