import { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';

function ConsumingStations() {
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
                <h1>Consuming Stations</h1>
            </main>
        </div>
    );
}

export default ConsumingStations;