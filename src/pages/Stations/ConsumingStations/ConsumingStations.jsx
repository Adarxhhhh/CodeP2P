import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import styles from './ConsumingStations.module.css';
import ConsumingStationCard from '../../../components/ConsumingStationCard/ConsumingStationCard';
import { FiPlus } from 'react-icons/fi';

const consumingStationData = [
    {
      csName: "Residence",
      consumptionRate: 80.7,
      location: { lat: -33.8567844, lng: 151.213108  },
    },
    {
        csName: "Tesla Charger",
        consumptionRate: 58.2,
        location: { lat: -33.87488, lng: 151.1987113 },
    },
  ];  



function ConsumingStations() {
    const csList = consumingStationData;
    console.log(csList);
    const numStations = csList.length;
    // const numStations = 0;

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                isStationsToggleable={false}
                isInsideStations={true}
            />
            <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <div className='page-content'>
                    <div className={styles.buttonHeader}>
                    <h1>Consuming Stations</h1>
                    <button className={styles.addButton}>
                        <FiPlus className={styles.addIcon}/> Add Consuming Station
                    </button>
                    </div>
                    {numStations > 0 ? (
                        <ul className={styles.consumingStationsList}>
                            {csList.map((station) => {
                                console.log(station);
                                return(
                                    <ConsumingStationCard
                                        stationObj={station}
                                        key={station.csName}
                                    />
                                )
                            })}
                        </ul>
                    ): (
                        <h3>Loading...</h3>
                    ) }
                </div>
            </main>
        </div>
    );
}

export default ConsumingStations;