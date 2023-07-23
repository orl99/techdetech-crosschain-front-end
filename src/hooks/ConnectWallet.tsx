import { ethers, BrowserProvider, JsonRpcSigner, Contract, } from "ethers";
import erc20abi from './erc20abi.json';
import { AssetsList } from "../interface/AssetsList";

const assetsList: AssetsList[] = [
    {
        name: 'WETH',
        APY: 0.4,
        tokenSrc: 'https://changenow.io/images/cached/weth.png',
        balance: 0,
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    },
    {
        name: 'USDC',
        APY: 0.5,
        tokenSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png',
        balance: 0,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    },
    {
        name: 'MATIC',
        APY: 0.5,
        tokenSrc: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
        balance: 0,
        address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
    },
    // {
    //     name: 'ETH',
    //     APY: 0.5,
    //     tokenSrc: 'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png',
    //     balance: 0,
    //     address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'

    // }
];

const getBalance = async (contract:ethers.Contract, signer:JsonRpcSigner) => {
    const balance = await contract.balanceOf(signer.address)
    return balance;
}

export const makeContractTokens = async (tokenList: AssetsList[] , provider: BrowserProvider, signer: JsonRpcSigner) => {
    const genericErc20Abi = erc20abi;
    const tokenContracts: AssetsList[] = [];

    for await (const token of tokenList) {
        if(!token.address) {
            return;
        }
        const contract = new Contract(token.address, genericErc20Abi, provider);
        if(!contract)
        return;
        const balance = await getBalance(contract, signer);
        tokenContracts.push({
            balance: Number(ethers.formatUnits(balance)),
            contract: contract,
            address: token.address,
            APY: token.APY,
            name: token.name,
            tokenSrc: token.tokenSrc
        });
    }
    console.log('tokenContracts', tokenContracts)
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
    setSigner: React.Dispatch<JsonRpcSigner>,
    setSupplyListedAssets: React.Dispatch<AssetsList[]>
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
            const allContractTokens = await makeContractTokens(assetsList, provider, signer);
            if(allContractTokens) {
                console.log('allContractTokens', allContractTokens);
                setSupplyListedAssets(allContractTokens);
            }
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