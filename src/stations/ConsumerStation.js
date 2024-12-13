import React, { useEffect, useState } from 'react';
import styles from './ConsumingStation.module.css';

function ConsumingStation() {
    const [producers, setProducers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState(null);

    useEffect(() => {
        async function fetchProducers() {
            const response = await fetch('/api/getAllProducers');
            const data = await response.json();
            setProducers(data.producers);
        }
        fetchProducers();
    }, []);

    return (
        <section className={styles.stationSection}>
            <h1>Your Stations</h1>
            
        </section>
    );
}

export default ConsumingStation;
