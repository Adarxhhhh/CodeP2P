import styles from './BalanceCard.module.css';

function BalanceCard({ type, balance, onAddMore }) {
    return (
        <div className={styles.balanceCard}>
            <h2>{type === 'ETH' ? 'Balance' : 'Carbon Credits'}</h2>
            <p>{balance} {type}</p>
            <button className={styles.addButton} onClick={onAddMore}>
                {type === 'ETH' ? 'Connect Wallet' : 'Refresh Balance'}
            </button>
        </div>
    );
}

export default BalanceCard;
