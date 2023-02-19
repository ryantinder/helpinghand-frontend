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
                address: "0x4e78499BE4B9B10ce8504296ff3c05ceBA556380"
            },
            {
                name: "IdentityProvider",
                address: "0xf9c4E7e36A0738972aAcaF6a9814CD7FeDEFcc5D"
            }
        ]
    }),
    foundry({
        project: '../treehacks/my-project',
        include: ['Project.json']
    }),
    react()
  ],
})
