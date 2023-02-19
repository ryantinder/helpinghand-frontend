const ethers = require('ethers');

const provider = new ethers.providers.JsonRpcProvider('https://arb-mainnet.g.alchemy.com/v2/fmrqiiCFFjJ_nyF3ItEflVVJ3LF-HBz_');

const projectFactoryABI = [
    { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'projectAddress',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            { name: 'host', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'ProjectCreated',
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            { name: 'ipfs', internalType: 'string', type: 'string' },
            { name: 'asset', internalType: 'contract IERC20', type: 'address' },
        ],
        name: 'createProject',
        outputs: [{ name: 'project', internalType: 'address', type: 'address' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'identityProvider',
        outputs: [
            { name: '', internalType: 'contract IdentityProvider', type: 'address' },
        ],
    },
]

const projectAbi = [
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
const project = new ethers.Contract("0xC82B35678D3f67AaCA062Fe1F1Fd70a8caF886F1", projectAbi, provider)

async function main() {
    const ipfs = await project.ipfs()
    console.log(ipfs)
}

main().then()