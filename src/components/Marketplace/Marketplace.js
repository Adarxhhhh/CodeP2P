import React, { useState } from 'react';
import MarketplaceTable from '../MarketplaceTable/MarketplaceTable';
import styles from './Marketplace.module.css';

function Marketplace() {
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    return (
        <section className={styles.marketplaceSection}>
            <div className={styles.marketplaceHeader}>
                <h2>Marketplace</h2>
                <div className={styles.filterContainer}>
                    <input 
                        type="text" 
                        placeholder="Filter by transaction" 
                        className={styles.filterInput} 
                        value={filterText} 
                        onChange={handleFilterChange} 
                    />
                </div>
            </div>
            <MarketplaceTable filterText={filterText} />
        </section>
    );
}

export default Marketplace;
