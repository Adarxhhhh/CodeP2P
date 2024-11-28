import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';


function Settings() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                isStationsToggleable={true}
                isInsideStations={false}
            />
            <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <h1>Settings</h1>
            </main>
        </div>
    );
}

export default Settings;