import React, { useState } from 'react';
import { FiHome, FiSettings, FiChevronDown, FiChevronUp, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import logo from '../../assets/p2p.png';

function Sidebar({ isSidebarOpen }) {
    const [isStationsOpen, setIsStationsOpen] = useState(false);
    const userRole = localStorage.getItem('userRole'); // Retrieve user role from localStorage

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
                <Link to="/dashboard" className={styles.navItem}>
                    <FiHome className={styles.icon} /> Dashboard
                </Link>
                <div className={styles.navItem} onClick={toggleStations}>
                    <FiMapPin className={styles.icon} /> My Stations
                    {isStationsOpen ? (
                        <FiChevronUp className={styles.chevronIcon} />
                    ) : (
                        <FiChevronDown className={styles.chevronIcon} />
                    )}
                </div>
                {isStationsOpen && (
                    <div className={styles.subNav}>
                        {userRole === 'producer' && (
                            <Link to="/producing-stations" className={styles.subNavItem}>
                                <FiArrowRight className={styles.subNavIcon} /> Producing Stations
                            </Link>
                        )}
                        <Link to="/consuming-stations" className={styles.subNavItem}>
                            <FiArrowRight className={styles.subNavIcon} /> Consuming Stations
                        </Link>
                    </div>
                )}
                <Link to="/settings" className={styles.navItem}>
                    <FiSettings className={styles.icon} /> Settings
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
