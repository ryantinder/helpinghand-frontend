import { modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Chain, configureChains, createClient } from 'wagmi'
import { arbitrum } from 'wagmi/chains'

export const walletConnectProjectId = 'fb98045db6cc26b21531a45e07c8a549'
const { chains, provider, webSocketProvider } = configureChains(
  [arbitrum],
  [walletConnectProvider({ projectId: walletConnectProjectId })],
)

export const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: 'Go Fund This', chains }),
  provider,
  webSocketProvider,
})

export { chains }
