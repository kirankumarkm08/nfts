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

// ✅ Ensure projectId is defined
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "WalletConnect `projectId` is missing. Please define NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID in your .env file."
  );
}

// Define chains as a properly typed constant array
const wagmiChains = [base, optimism] as const;

const { connectors } = getDefaultWallets({
  appName: "NFT Gallery",
  projectId,
});

const config = createConfig({
  chains: wagmiChains,
  transports: {
    [base.id]: http("https://mainnet.base.org"),
    [optimism.id]: http("https://mainnet.optimism.io"),
  },
  connectors,
});

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
