import { useState } from 'react';
import MarketplaceComponent from '../../components/MarketplaceComponent/MarketplaceComponent';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

function Marketplace() {
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
                <div className='page-content'>
                    <MarketplaceComponent/>
                </div>
            </main>
        </div>
    );
}

export default Marketplace;
