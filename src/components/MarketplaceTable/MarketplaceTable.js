import React from 'react';
import styles from './MarketplaceTable.module.css';

function MarketplaceTable({ filterText }) {
    const data = [
        { transaction: "AdiShriyan Solar Co", energyType: "Solar", credits: "230.00 CC", amount: "0.145 ETH", refNumber: "0047568936" },
        { transaction: "Dhanush MA Solar Panels", energyType: "Solar", credits: "150.00 CC", amount: "0.120 ETH", refNumber: "0031568935" },
        { transaction: "Kunal HydroElectric", energyType: "HydroElectric", credits: "100.00 CC", amount: "0.90 ETH", refNumber: "0031568935" }
    ];

    const filteredData = data.filter((item) =>
        item.transaction.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <table className={styles.marketplaceTable}>
            <thead>
                <tr>
                    <th>Transaction</th>
                    <th>Energy Type</th>
                    <th>Carbon Credits</th>
                    <th>Amount</th>
                    <th>Reference Number</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.transaction}</td>
                        <td>{item.energyType}</td>
                        <td>{item.credits}</td>
                        <td>{item.amount}</td>
                        <td>{item.refNumber}</td>
                        <td><button className={styles.buyButton}>Buy</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MarketplaceTable;
