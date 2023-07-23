
import './Balance.component.css'
interface Props {
    balanceTitle: string;
    balanceAmount: string;
}

export const Balance: React.FC<Props> = ({balanceAmount, balanceTitle}) => {
    return (
        <>
            <div className="balance-supply-container">
                <h2 className="balance-amount-balance">{balanceTitle}</h2>
                <p className="balance-amount">${balanceAmount}</p>
            </div>
        </>
    );
};
