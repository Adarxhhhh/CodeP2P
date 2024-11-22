import styles from './BalanceCard.module.css';

function BalanceCard({ type, balance, onAddMore }) {
    return (
        <div className={styles.balanceCard}>
            <h2>{type === 'ROSE' ? 'Balance' : 'Carbon Credits'}</h2>
            <p>{balance} {type}</p>
            <button className={styles.addButton} onClick={onAddMore}>
                {type === 'ROSE' ? 'Connect Wallet' : 'Refresh Balance'}
            </button>
        </div>
    );
}

export default BalanceCard;
