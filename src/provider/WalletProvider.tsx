"use client";

import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

// Configure chains
// const chains = [base, mainnet, optimism, arbitrum, polygon, bsc];

// Set up connectors
const { connectors } = getDefaultWallets({
  appName: "NFT Gallery",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
});

// Create config
const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
    // [mainnet.id]: http("https://eth.llamarpc.com"),
    [optimism.id]: http("https://mainnet.optimism.io"),
    // [arbitrum.id]: http("https://arb1.arbitrum.io/rpc"),
    // [polygon.id]: http("https://polygon-rpc.com"),
    // [bsc.id]: http("https://bsc-dataseed.binance.org"),
  },
  connectors,
});

// Create query client
const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={lightTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
