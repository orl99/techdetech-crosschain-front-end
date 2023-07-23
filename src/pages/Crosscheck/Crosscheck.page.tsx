import { AssetsTable } from "../../components/AssetsTable/AssetsTable.component";

export const CrosscheckPage = () => {
  //hooks goes here
  //jsx goes here
  return <>
    <div className="crosscheck-main-container">

        {/* Headers goes here*/}
        
        {/* cards goes here */}
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
  </>;
};
