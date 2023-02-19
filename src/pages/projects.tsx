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
    useEffect(() => {
        if (isConnected && chain) {
            getProjects(client.provider).then(setAddresses)
            getMyIdentity(client.provider, address as string).then(setId)
        } else {
            setAddresses([])
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
