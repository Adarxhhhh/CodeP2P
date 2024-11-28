import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import MapPopup from '../../../components/MapPopup/MapPopup';

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
                <h1>Map Popup!</h1>
                <br/>
                <br/>
                <button onClick={() => setButtonPopup(true)}>Nearby Producers</button>
            </main>

            <MapPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3>Nearby Producers</h3>
            </MapPopup>
        </div>
    );
}

export default ProducingStations;