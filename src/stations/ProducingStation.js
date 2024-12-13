import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './ProducingStation.module.css';
import solarPanelImg from '../assets/solar-panel.png';
import Marketplace from '../components/Marketplace/Marketplace';

function ProducingStation() {
    const [producers, setProducers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState(null);

    useEffect(() => {
        async function fetchProducers() {
            try {
                const response = await fetch('/api/getAllProducers');
                const data = await response.json();
                setProducers(data.producers);
            } catch (error) {
                console.error('Error fetching producers:', error);
            }
        }
        fetchProducers();
    }, []);

    return (
        <section className={styles.stationSection}>
            <div className={styles.headerWrapper}>
                <h1>Producing Station</h1>
                <img src={solarPanelImg} alt="Solar Panel" className={styles.solarImage} />
            </div>
            <div className={styles.mapWrapper}>
                <LoadScript googleMapsApiKey="AIzaSyAyRwXT4G1t-Is3s9msXikuBVt10uvRP5o">
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '500px' }}
                        center={{ lat: 42.31919, lng: -71.04324 }}
                        zoom={13}
                    >
                        {producers.map((producer) => (
                            <Marker
                                key={producer._id}
                                position={{
                                    lat: producer.coordinates.lat,
                                    lng: producer.coordinates.lng,
                                }}
                                onClick={() => setSelectedProducer(producer)}
                            />
                        ))}
                        {selectedProducer && (
                            <InfoWindow
                                position={{
                                    lat: selectedProducer.coordinates.lat,
                                    lng: selectedProducer.coordinates.lng,
                                }}
                                onCloseClick={() => setSelectedProducer(null)}
                            >
                                <div>
                                    <h3>{selectedProducer.name}</h3>
                                    <p>Available Energy: {selectedProducer.availableEnergy} kWh</p>
                                    <p>Price per Unit: {selectedProducer.pricePerUnit} ETH</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
            <div className={styles.marketplaceWrapper}>
                <Marketplace />
            </div>
        </section>
    );
}

export default ProducingStation;
