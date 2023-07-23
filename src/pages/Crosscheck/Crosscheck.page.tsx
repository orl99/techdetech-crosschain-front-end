import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";
import { Balance } from "../../components/Balance/Balance.component";
import './Crosscheck.page.css'
import { connectWallet } from "../../components/ConnectWallet.component";
import { useState, useEffect } from "react";

export const CrosscheckPage = () => {
  //hooks goes here
  const [provider, setProvider] = useState<any | null>(null);
  const [signer, setSigner] = useState<any | null>(null);
  const [balance, setBalance] = useState(0)
  const [account, setAccount] = useState('');
  
  useEffect(() => {
    if(signer){
      setAccount(signer.address);
    }
    // provider.getBalance('0x3749367e53B6fdf5ceDb2D6BCEf7d740C7074885');
  }, [signer,provider])

  //jsx goes here
  return <>
    <div className="crosscheck-main-container">

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
<section>
  <button onClick={()=> connectWallet(setProvider,setSigner)}> {account? account: "Connect to wallet"} </button>  
  </section>
  {provider? 
  <div className="crosscheck-main-container">

      <div className="flex w-full">
          <div className="grid flex-grow card bg-base-300 rounded-box place-items-stretch p-5">
              Deposit
              <AssetsTable />
          </div>
          <div className="divider divider-horizontal" />
          <div className="grid flex-grow card bg-base-300 rounded-box place-items-stretch p-5">
              Borrow
              <AssetsTable />
          </div>
      </div>
  </div>
:"" }
    </div>
  </>;
};