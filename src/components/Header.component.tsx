export const Header = () => {
  //hooks goes here
  //jsx goes here
    return <>
        <div className="header-main">
            <div className="header-logo">
                <img className="header-logo-el" src="assets/logo.png" alt="" />
            </div>
            <div className="header-menu">
                <ul className="header-menu-ul">
                    <li>Dashboard</li>
                    <li>Yields</li>
                    <li>Assets</li>
                    <li>Support</li>
                </ul>
            </div>
            <div className="header-crosscheck-btns">
                <button>USDC ETHEREUM</button>
                <button>Connect wallet</button>
            </div>
        </div>
    </>;
};
