import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";
import { Balance } from "../../components/Balance/Balance.component";
import './Crosscheck.page.css';
import { connectWallet } from "../../hooks/ConnectWallet";
import { useState, useEffect } from "react";
import { viewTokenURI } from "../../hooks/etherstx";
import { makeContractTokens } from "../../hooks/ConnectWallet";

import { JsonRpcSigner, BrowserProvider} from 'ethers'

export const CrosscheckPage = () => {
  //hooks goes here
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState('');
  const [supplyBalance, setSupplyBalance] = useState();
  const [borrowBalance, setBorrowBalance] = useState();
  
  // provider = ethers libraries
  // signer = para hacer llamadas y firmas
  
  const [MainContract, setMainContract] = useState<any | null>(null);

  useEffect(() => {
    if(signer){
      setAccount(signer.address);
      setMainContract(viewTokenURI(signer));
      console.log(MainContract);
    }
    }, [signer, provider, account]);
    const tokenList =  [
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48','0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'  //weth, usdc, matic
];


  //jsx goes here
  return <>
    <div className="crosscheck-main-container">
        <section className="flex justify-end p-10">
          <button onClick={()=> connectWallet(setProvider,setSigner)}> {account? account: "Connect to wallet"} </button> 
          { provider && signer ? <button onClick={() => makeContractTokens(tokenList, provider, signer)}> acc</button> : "" } 
        </section>
        {/* Headers goes here*/}
        <div className="crosscheck-balance-container">
          <div className="crosscheck-balance-box crosscheck-supply-balance">
            <Balance balanceAmount="400"  balanceTitle="Supply balance"/>
          </div>
          <div className="crosscheck-net-apy">
            <h1>NET APY</h1>
            <h3>------</h3>
          </div>
          <div className="crosscheck-balance-box crosscheck-borrow-balance">
            <Balance balanceAmount="400"  balanceTitle="Borrow balance"/>

          </div>
        </div>
        
        {/* cards goes here */}

        {provider? 
        <div className="crosscheck-main-container">

            <div className="flex w-full">
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-stretch p-5">
                Supply Markets
                    <AssetsTable />
                </div>
                <div className="divider divider-horizontal" />
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-stretch p-5">
                Borrow Markets
                    <AssetsTable />
                </div>
            </div>
        </div>
      :"" }
    </div>
  </>;
};