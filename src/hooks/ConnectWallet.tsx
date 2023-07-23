import { ethers, BrowserProvider, JsonRpcSigner, Contract} from "ethers";
import erc20abi from './erc20abi.json';

const tokenList =  [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48','0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'  //weth, usdc, matic
];

const getBalance = async (contract:ethers.Contract, signer:JsonRpcSigner) => {
    const balance = await contract.balanceOf(signer.address)
    return balance;
}

export const makeContractTokens = (tokenList: string[] , provider: BrowserProvider, signer: JsonRpcSigner) => {
    const genericErc20Abi = erc20abi;
    // const tokenContractAddress = '0x...';
    const tokenContracts = tokenList.map((address) => {
        const contract = new Contract(address, genericErc20Abi, provider);
        const balance = getBalance(contract,signer);
        return {
            balance,
            address,
            contract
        }
    });
    console.log(tokenContracts)
    return tokenContracts;
}

const changeRPC = async () => {
    await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: '0x1',
                chainName: "ETH",
                nativeCurrency: {
                    name: "ETH Mainnet",
                    symbol: "ETH",
                    decimals: 18,
                },
                rpcUrls: ['https://eth.llamarpc.com'],
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
            if (window.ethereum.networkVersion != 0x1) {
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


// // const ethers = require('ethers');
// const genericErc20Abi = require(..../.../Erc20.json);
// const tokenContractAddress = '0x...';
// const provider = ...; (use ethers.providers.InfuraProvider for a Node app or ethers.providers.Web3Provider(window.ethereum/window.web3) for a React app)
// const contract = new ethers.Contract(tokenContractAddress, genericErc20Abi, provider);
// const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString();