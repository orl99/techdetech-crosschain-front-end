import { ethers, BrowserProvider, JsonRpcSigner, Contract} from "ethers";

const tokenList =  [
    {

    }
];

const makeContractTokens = (tokenList: string[], provider: BrowserProvider, signer: JsonRpcSigner) => {
    const genericErc20Abi = require('./abi.json');
    // const tokenContractAddress = '0x...';
    const tokenContracts = tokenList.map((address) => {
        const contract = new Contract(address, genericErc20Abi, provider);
        const balance = (await contract.balanceOf(signer.address)).toString();
        return {
            balance,
            address
        }
    });
    return tokenContracts;
}

const changeRPC = async () => {
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: '0x5',
                chainName: "ETH Goerli",
                nativeCurrency: {
                    name: "GoerliETH",
                    symbol: "ETH",
                    decimals: 18,
                },
                rpcUrls: ['https://ethereum-goerli.publicnode.com'],
            },
        ],
    });
};

export const connectWallet = async (
    setProvider: React.Dispatch<BrowserProvider>,
    setSigner: React.Dispatch<JsonRpcSigner>
) => {
    if (window.ethereum) {
        //check if Metamask is installed
        try {
            // check if Chain is correct
            if (window.ethereum.networkVersion != 0x5) {
                changeRPC();
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            setProvider(provider);
            setSigner(signer);
        } catch (error) {
            return {
                connectedStatus: false,
                status: "🦊 Connect to Metamask using the button on the top right.",
            };
        }
    } else {
        return {
            connectedStatus: false,
            status:
                "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
        };
    }
};


// const ethers = require('ethers');
const genericErc20Abi = require(..../.../Erc20.json);
const tokenContractAddress = '0x...';
const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)
const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();