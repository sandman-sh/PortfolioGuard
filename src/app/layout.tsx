import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolioguard.eth"),
  title: "PortfolioGuard.eth",
  description:
    "Your autonomous onchain DeFi portfolio manager with its own ENS identity, powered by 0G dAIOS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
