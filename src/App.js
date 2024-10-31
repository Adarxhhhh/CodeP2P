import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCard from './components/BalanceCard/BalanceCard';
import Marketplace from './components/Marketplace/Marketplace';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="app-container">
            {}
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <section className="balance-section">
                    <BalanceCard type="ETH" balance="0.0036" />
                    <BalanceCard type="CC" balance="00.00" />
                </section>
                <Marketplace />
            </main>
        </div>
    );
}

export default App;
