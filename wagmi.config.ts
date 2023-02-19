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
                address: "0xFC40A788787CC7D27Fb8888e5Dee08B4FfF1F341"
            },
            {
                name: "IdentityProvider",
                address: "0x77F155bAb80FC4941010f0dC758DB7613e9E2D91"
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
