import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";
import { Balance } from "../../components/Balance/Balance.component";
import './Crosscheck.page.css';
import { connectWallet } from "../../hooks/ConnectWallet";
import { useState, useEffect } from "react";
import { viewTokenURI } from "../../hooks/etherstx";

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


  //jsx goes here
  return <>
    <div className="crosscheck-main-container">
        <section className="flex justify-end p-10">
          <button onClick={()=> connectWallet(setProvider,setSigner)}> {account? account: "Connect to wallet"} </button>  
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