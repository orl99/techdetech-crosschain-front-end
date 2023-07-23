import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";
import { Balance } from "../../components/Balance/Balance.component";
import './Crosscheck.page.css'

export const CrosscheckPage = () => {
  //hooks goes here
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
        <div className="crosscheck-assets flex w-full">
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
  </>;
};
