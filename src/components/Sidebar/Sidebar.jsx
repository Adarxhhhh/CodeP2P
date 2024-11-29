import { useEffect, useState } from 'react';
import { FiHome, FiSettings, FiChevronDown, FiChevronUp, FiMapPin, FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Sidebar.module.css';
import darkLogo from '../../assets/logo.png';
import lightLogo from '../../assets/p2p.png';
import { NavLink } from 'react-router-dom';


function Sidebar({ isSidebarOpen , isStationsToggleable , isInsideStations}) {
    const [isStationsOpen, setIsStationsOpen] = useState(false);

    const { theme } = useTheme();

    const activeLogo = theme == 'dark' ? darkLogo : lightLogo;

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
        <div className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarHidden : ''}`}>
            <div className={styles.logoContainer}>
                <a href="https://power2peer.com/" target="_blank" rel="noopener noreferrer">
                    <img src={activeLogo} alt="Power2Peer Logo" className={styles.logo} />
                </a>
            </div>
            <nav className={styles.nav}>
                <NavLink 
                    to="/" 
                    className={styles.navItem}
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
                        >
                            <FiArrowRight className={styles.subNavIcon} /> Producing Stations
                        </NavLink>
                        <NavLink 
                            to="/consuming-stations" 
                            className={styles.subNavItem}
                        >
                            <FiArrowRight className={styles.subNavIcon} /> Consuming Stations
                        </NavLink>
                    </div>
                )}
                <NavLink 
                    to="/marketplace" 
                    className={styles.navItem}
                >
                    <FiShoppingCart className={styles.icon} /> Marketplace
                </NavLink>
                <NavLink 
                    to="/settings" 
                    className={styles.navItem}
                >
                    <FiSettings className={styles.icon} /> Settings
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;
