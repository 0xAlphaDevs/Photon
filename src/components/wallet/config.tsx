import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { Chain } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

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

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: '', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [thetaTestnet] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})