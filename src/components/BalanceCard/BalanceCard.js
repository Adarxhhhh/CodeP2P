import React from 'react';
import styles from './BalanceCard.module.css';

function BalanceCard({ type, balance }) {
    return (
        <div className={styles.balanceCard}>
            <h2>{type === 'ETH' ? 'Balance' : 'Carbon Credits'}</h2>
            <p>{balance} {type}</p>
            <button className={styles.addButton}>Add more</button>
        </div>
    );
}

export default BalanceCard;
