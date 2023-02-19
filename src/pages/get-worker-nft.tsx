import { useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import MintButton from "../components/MintButton"


// 

function Page() {
    const { isConnected } = useAccount()
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()    
    const [poolIds, setPoolIds] = useState<string[]>([])

    // CONST = https://shuttle-9.estuary.tech/gw/ipfs/bafkreicffpxbqxni5qdthwigzrz7jz6nffdzv3thi762xxiqgaqstiuygu/
      //end table data

   if (isConnected) {
        return (
            <>
            <div className='text-center h-screen justify-center items-center w-2/3 mx-auto'>  
                <div className="text-5xl font-bold my-10">Support your community and get Paid!</div>
                <div className="text-lg mt-6 mb-10">
                    Your Helper NFT is the key to the Helping Hand ecosystem. Use it to enter projects, submit progress, and get paid!
                    Your NFT is your identity, so it cannot be transferred and you can only mint one. Welcome to Helping Hand!
                </div>
                <MintButton />
            </div>
            </>
        );
   }
   return (
    <div></div>
   );
}

export default Page
