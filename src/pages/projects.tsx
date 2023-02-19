import { useEffect, useState } from 'react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import Table from '../components/Table'
import { client } from '../wagmi'
import { useProjectFactoryIdentityProvider } from '../generated'
import { getMyIdentity, getProjects } from '../lib/helpers'


function Page() {
    const { isConnected, address } = useAccount()
    const { chain } = useNetwork()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    const [ addresses, setAddresses] = useState<string[]>([])
    const [ id, setId ] = useState<number>(-1)
    const { data: IPaddress } = useProjectFactoryIdentityProvider();
    const { data: balance } = useBalance(address)
    // CONST = https://shuttle-9.estuary.tech/gw/ipfs/bafkreicffpxbqxni5qdthwigzrz7jz6nffdzv3thi762xxiqgaqstiuygu/
    //end table data
    useEffect(() => {
        if (isConnected && chain) {
            console.log("connected")
            getProjects(client.provider).then(setAddresses)
            getMyIdentity(client.provider, address as string).then(setId)
        } else {
            setAddresses([])
            console.log("not connected")
        }
    }, [isConnected, chain])
    return (
        <>
            <Table addresses={addresses} id={id}/>
            <div>{error && error.message}</div>
        </>
    )
}

export default Page
