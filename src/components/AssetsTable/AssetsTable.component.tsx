export const AssetsTable = ()  => {


    // TODO: REFACTOR
    return(
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src="data:image/png;base64,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"
                                                alt="ChainLink"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>LINK</td>
                            <td>
                            {/* <!-- Balance goes here --> */}

                                {/* {#await linkBalancePromise}
                                    ...
                                {:then balance}
                                    {balance}
                                {/await} */}
                            </td>
                            <th>
                                <button className="btn btn-xs btn-secondary">lend</button>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1024px-Circle_USDC_Logo.svg.png"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>USDC</td>
                            <td>...</td>
                            <th>
                                <button className="btn btn-xs btn-secondary">Lend</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}