import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import MapPopup from '../../../components/MapPopup/MapPopup';
import styles from './ProducingStations.module.css';

function ProducingStations() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [buttonPopup, setButtonPopup] = useState(false);
    
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
                    <h1>Map Popup!</h1>
                    <br/>
                    <br/>
                    <button className={styles.mapButton} onClick={() => setButtonPopup(true)}>Nearby Producers</button>
                </div>
            </main>

            <MapPopup trigger={buttonPopup} setTrigger={setButtonPopup}
                title='Nearby Producers'
            >
            </MapPopup>
        </div>
    );
}

export default ProducingStations;