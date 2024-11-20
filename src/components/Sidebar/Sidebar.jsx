import { useEffect, useState } from 'react';
import { FiHome, FiSettings, FiChevronDown, FiChevronUp, FiMapPin, FiArrowRight } from 'react-icons/fi';
import styles from './Sidebar.module.css';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

function Sidebar({ isSidebarOpen , isStationsToggleable , isInsideStations}) {
    const [isStationsOpen, setIsStationsOpen] = useState(false);

    // if(!alreadyOpen) setIsStationsOpen((iso) => !iso);

    // useEffect(() => {
    //     if(alreadyOpen && !isStationsOpen) setIsStationsOpen((iso) => !iso);
    // }, [alreadyOpen, isStationsOpen]);

    useEffect(() => {
        if(isInsideStations) setIsStationsOpen(true);
    }, [isStationsOpen, isInsideStations]);

    const toggleStations = () => {
        if(isStationsToggleable) setIsStationsOpen((iso) => !iso);
    };

    return (
        <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarHidden : ''}`}>
            <div className={styles.logoContainer}>
                <a href="https://power2peer.com/" target="_blank" rel="noopener noreferrer">
                    <img src={logo} alt="Power2Peer Logo" className={styles.logo} />
                </a>
            </div>
            <nav className={styles.nav}>
                <NavLink 
                    to="/" 
                    className={styles.navItem}
                    style={({ isActive }) => {
                        return {
                            color: isActive && '#ECEFF4',
                            backgroundColor: isActive && '#272D45'
                        };
                    }}
                >
                    <FiHome className={styles.icon} /> Dashboard
                </NavLink>
                <div className={styles.navItem} onClick={toggleStations}>
                    <FiMapPin className={styles.icon} /> My Stations
                    {isStationsOpen ? <FiChevronUp className={styles.chevronIcon} /> : <FiChevronDown className={styles.chevronIcon} />}
                </div>
                {isStationsOpen && (
                    <div className={styles.subNav}>
                        <NavLink 
                            to="/producing-stations" 
                            className={styles.subNavItem}
                            style={({ isActive }) => {
                                return {
                                    color: isActive && '#ECEFF4',
                                    backgroundColor: isActive && '#272D45'
                                };
                            }}
                        >
                            <FiArrowRight className={styles.subNavIcon} /> Producing Stations
                        </NavLink>
                        <NavLink 
                            to="/consuming-stations" 
                            className={styles.subNavItem}
                            style={({ isActive }) => {
                                return {
                                    color: isActive && '#ECEFF4',
                                    backgroundColor: isActive && '#272D45'
                                };
                            }}
                        >
                            <FiArrowRight className={styles.subNavIcon} /> Consuming Stations
                        </NavLink>
                    </div>
                )}
                <NavLink 
                    to="/settings" 
                    className={styles.navItem}
                    style={({ isActive }) => {
                        return {
                            color: isActive && '#ECEFF4',
                            backgroundColor: isActive && '#272D45'
                        };
                    }}
                >
                    <FiSettings className={styles.icon} /> Settings
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;
