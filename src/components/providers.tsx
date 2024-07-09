"use client"

import * as React from "react"
import { WagmiProvider, createConfig } from "wagmi"
import { Chain } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider, getDefaultConfig } from "connectkit"

interface ProvidersProps {
  children: React.ReactNode
}

const thetaTestnet: Chain = {
  id: 365,
  name: "Theta Testnet",
  rpcUrls: {
    default: { http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"] },
    public: { http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"] },
  },
  nativeCurrency: {
    name: "TFUEL",
    symbol: "TFUEL",
    decimals: 18,
  },
  blockExplorers: {
    default: { url: "https://testnet-explorer.thetatoken.org/", name: "Theta Testnet Explorer" },
  },
}

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [thetaTestnet],
    appName: "EtherGigs",
  })
)


const queryClient = new QueryClient()

export function Providers({ children, ...props }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme="rounded">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}