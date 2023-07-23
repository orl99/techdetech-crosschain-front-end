import { AssetsList }  from './../../interface/AssetsList'

type Props = {
    assetsList: AssetsList[]
}
export const AssetsTable: React.FC<Props> = ({assetsList})  => {

    return(
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>APY</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        assetsList.map((asset) => (
                                <tr key={asset.name}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={asset.tokenSrc}
                                                        alt={asset.name}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{String(asset.name)}</td>
                                    <td>
                                        ${asset.balance}
                                    </td>
                                    <th>
                                        {asset.APY}%
                                    </th>
                                    <th>
                                        <button className="btn btn-xs btn-secondary">lend</button>
                                    </th>
                                </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}