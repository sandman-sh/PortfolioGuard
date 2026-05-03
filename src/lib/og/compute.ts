type ComputeInsight = {
  summary: string;
  volatility: "low" | "medium" | "high";
  stablecoinBias: "increase" | "hold";
  shouldSwap: boolean;
  tokenIn?: string;
  tokenOut?: string;
  amountUsd?: number;
};

export async function runZeroGCompute(prompt: string): Promise<ComputeInsight> {
  const apiKey = process.env.TOKENROUTER_API_KEY;
  const apiUrl = process.env.TOKENROUTER_API_URL || "https://api.tokenrouter.io/v1/chat/completions";
  
  if (!apiKey || apiKey === "your_tokenrouter_api_key_here") {
    console.warn("TOKENROUTER_API_KEY not set. Falling back to mocked AI response.");
    return {
      summary: `Mocked analysis. Please set TOKENROUTER_API_KEY. ${prompt.substring(0, 50)}...`,
      volatility: "medium",
      stablecoinBias: "hold",
      shouldSwap: false,
    };
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o", // Update this to match your TokenRouter model name
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are an expert autonomous DeFi portfolio manager agent. 
Analyze the user's message, portfolio data, and active rules to make a trading decision.
You must return your decision as a strict JSON object matching this exact schema:
{
  "summary": "A detailed explanation of your reasoning.",
  "volatility": "low" | "medium" | "high",
  "stablecoinBias": "increase" | "hold",
  "shouldSwap": boolean,
  "tokenIn": "Symbol of token to sell (e.g. ETH) - omit if shouldSwap is false",
  "tokenOut": "Symbol of token to buy (e.g. USDC) - omit if shouldSwap is false",
  "amountUsd": number (the USD value to swap) - omit if shouldSwap is false
}
Always respect the user's rules. If a rule threshold is broken, execute a swap to rebalance. If the user explicitly asks to swap or rebalance, obey it.`
        },
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI API Error:", err);
    throw new Error("Failed to fetch decision from AI.");
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  return result as ComputeInsight;
}
