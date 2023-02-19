import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, UseContractWriteConfig, useProvider } from 'wagmi'
import { identityProviderAddress, useIdentityProvider, useIdentityProviderMint, usePrepareIdentityProviderMint } from '../generated'
import { getMyIdentity } from '../lib/helpers';
import { client } from '../wagmi';

export function MintNFT() {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    const { address } = useAccount();

    const { config } = usePrepareIdentityProviderMint()
    const [id, setId] = React.useState(-1);
    const {
        data: mintData,
        write: mint,
        isLoading: isMintLoading,
        isSuccess: isMintStarted,
        error: mintError,
    } = useContractWrite(config as UseContractWriteConfig);


    const {
        data: txData,
        isSuccess: txSuccess,
        error: txError,
    } = useWaitForTransaction({
        hash: mintData?.hash,
    });
    
    React.useEffect(() => {
        getMyIdentity(client.provider, address as string).then(setId)
    }, []);

    return (
        <div className="mt-4">
            <button disabled={!mint || isMintLoading || id != -1 }
                onClick={() => { mint?.() }}
                className="bg-blue-600 text-white rounded-full px-6 py-3 text-3xl font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">

                {id != -1 ? "Already Minted!" : isMintLoading ? 'Minting...' : 'Mint'}
            </button>
            {txSuccess && (
                <div className="font-bold mt-2">
                    Successfully minted your NFT!&nbsp;
                    <a href={`https://arbiscan.io/tx/${txData?.transactionHash}`} className="hover:underline">
                        View Transaction
                    </a>
                </div>
            )}
        </div>
    )
}
export default MintNFT;