import { defineConfig } from '@wagmi/cli'
import { foundry, react, erc, etherscan} from '@wagmi/cli/plugins'
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    erc({
        20: true
    }),
    etherscan({
        apiKey: "56S7HS3XA43ZI25PXQP9AND4URN3J2T9P5",
        chainId: 42161,
        contracts: [
            {
                name: "ProjectFactory",
                address: "0xf8af87b21e049659495d57416a8b34c55c6e4cce"
            },
            {
                name: "IdentityProvider",
                address: "0x1ed0A95A237b63D55128Dd53D3877B50cB97B9a0"
            }
        ]
    }),
    foundry({
        project: '../my-project',
        include: ['Project.json']
    }),
    react()
  ],
})
