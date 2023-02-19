import bs58 from 'bs58';
import { ethers } from 'ethers';
import { identityProviderABI, identityProviderAddress, projectFactoryABI, projectFactoryAddress } from '../generated';
import { Provider } from "@wagmi/core"
// Return bytes32 hex string from base58 encoded ipfs hash,
// stripping leading 2 bytes from 34 byte IPFS hash
// Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
// E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
// "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"

export function getBytes32FromIpfsHash(ipfsListing: string) {
  return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
}

// Return base58 encoded ipfs hash from bytes32 hex string,
// E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
// --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"

export function getIpfsHashFromBytes32(bytes32Hex: string) {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = "1220" + bytes32Hex.slice(2)
  const hashBytes = Buffer.from(hashHex, 'hex');
  const hashStr = bs58.encode(hashBytes)
  return hashStr
}

export const USDC = '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'

export const projectAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_ipfs",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_host",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_asset",
                "type": "address"
            },
            {
                "internalType": "contract IdentityProvider",
                "name": "_identityProvider",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "asset",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "enter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "exit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContributors",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "host",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "identityProvider",
        "outputs": [
            {
                "internalType": "contract IdentityProvider",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ipfs",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const getMyIdentity = async (provider: Provider, address: string): Promise<number> => {
    const IdentityProvider = new ethers.Contract(identityProviderAddress[42161], identityProviderABI, provider)
    const filter = IdentityProvider.filters.Transfer(ethers.constants.AddressZero, address, null)
    const events = await IdentityProvider.queryFilter(filter);

    if (!events[0]) {
        return -1
    } else {
        return (events[0].args![2] as ethers.BigNumber).toNumber()
    }
}

export async function getProjects(provider: ethers.providers.Provider) {
    const con = new ethers.Contract(projectFactoryAddress[42161], projectFactoryABI, provider)
    // const IPAddress = await con.identityProvider()
    // console.log('addr', IPAddress)
    const events = await con.queryFilter(con.filters.ProjectCreated())
    const ret = events.map((event) => event.args?.project)
    console.log(ret)
    return ret;
}


export function BigNumberArrayIncludes(arr: readonly ethers.BigNumber[], val: number) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].eq(val)) {
            return true
        }
    }
    return false
}