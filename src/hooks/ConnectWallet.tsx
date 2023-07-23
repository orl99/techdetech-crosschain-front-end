import { ethers } from "ethers";

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
    setProvider: React.Dispatch<any>,
    setSigner: React.Dispatch<any>
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
