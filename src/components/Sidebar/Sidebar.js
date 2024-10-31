import React, { useState } from 'react';
import { FiHome, FiSettings, FiChevronDown, FiChevronUp, FiMapPin, FiArrowRight } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import logo from '../../assets/logo.png';

function Sidebar({ isSidebarOpen }) {
    const [isStationsOpen, setIsStationsOpen] = useState(false);

    const toggleStations = () => {
        setIsStationsOpen(!isStationsOpen);
    };

    return (
        <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarHidden : ''}`}>
            <div className={styles.logoContainer}>
                <a href="https://power2peer.com/" target="_blank" rel="noopener noreferrer">
                    <img src={logo} alt="Power2Peer Logo" className={styles.logo} />
                </a>
            </div>
            <nav className={styles.nav}>
                <a href="#" className={styles.navItem}>
                    <FiHome className={styles.icon} /> Dashboard
                </a>
                <div className={styles.navItem} onClick={toggleStations}>
                    <FiMapPin className={styles.icon} /> My Stations
                    {isStationsOpen ? <FiChevronUp className={styles.chevronIcon} /> : <FiChevronDown className={styles.chevronIcon} />}
                </div>
                {isStationsOpen && (
                    <div className={styles.subNav}>
                        <a href="#" className={styles.subNavItem}>
                            <FiArrowRight className={styles.subNavIcon} /> Producing Stations
                        </a>
                        <a href="#" className={styles.subNavItem}>
                            <FiArrowRight className={styles.subNavIcon} /> Consuming Stations
                        </a>
                    </div>
                )}
                <a href="#" className={styles.navItem}>
                    <FiSettings className={styles.icon} /> Settings
                </a>
            </nav>
        </aside>
    );
}

export default Sidebar;
