import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";
import { Balance } from "../../components/Balance/Balance.component";
import './Crosscheck.page.css';
import { connectWallet } from "../../hooks/ConnectWallet";
import { useState, useEffect } from "react";
import { makeContractTokens } from "../../hooks/ConnectWallet";

import { AssetsList }  from './../../interface/AssetsList'


import { JsonRpcSigner, BrowserProvider} from 'ethers'

const assetsList: AssetsList[] = [
  {
    name: 'WETH',
    APY: 0.4,
    tokenSrc: 'https://changenow.io/images/cached/weth.png',
    balance: 0
  },
  {
    name: 'USDC',
    APY: 0.5,
    tokenSrc: 'https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png',
    balance: 0
  },
  {
    name: 'MATIC',
    APY: 0.5,
    tokenSrc: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    balance: 0
  },
  // {
  //   name: 'ETH',
  //   APY: 0.5,
  //   tokenSrc: 'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/ZJZZK5B2ZNF25LYQHMUTBTOMLU.png',
  //   balance: 0
  // }
];

export const CrosscheckPage = () => {
  //hooks goes here

  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState('');
  const [supplyBalance, setSupplyBalance] = useState();
  const [borrowBalance, setBorrowBalance] = useState();


  const [supplyListedAssets, setSupplyListedAssets] = useState<AssetsList[]>([...assetsList]);
  const [borrowListedAssets, setborrowListedAssets] = useState<AssetsList[]>([...assetsList]);

  // provider = ethers libraries
  // signer = para hacer llamadas y firmas

  return <>
    <div className="crosscheck-main-container">
        <section className="flex justify-end p-10">
          <button onClick={()=> connectWallet(setProvider,setSigner, setSupplyListedAssets)}> {account? account: "Connect to wallet"} </button> 
          { provider && signer ? <button onClick={() => makeContractTokens(assetsList, provider, signer)}> acc</button> : "" } 
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
                    <AssetsTable assetsList={supplyListedAssets}/>
                </div>
                <div className="divider divider-horizontal" />
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-stretch p-5">
                Borrow Markets
                    <AssetsTable assetsList={borrowListedAssets}/>
                </div>
            </div>
        </div>
      :"" }
    </div>
  </>;
};