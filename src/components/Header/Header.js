import React from 'react';
import { FiMenu, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

function Header({ toggleSidebar, logout }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            {/* Burger menu for toggling the sidebar */}
            <FiMenu
                className={styles.burgerIcon}
                onClick={toggleSidebar}
                title="Toggle Sidebar"
            />

            {/* Search bar */}
            <input
                type="text"
                className={styles.searchBar}
                placeholder="Search here..."
            />

            {/* Right-side icons: Light/Dark mode toggle and Logout */}
            <div className={styles.icons}>
                {theme === 'dark' ? (
                    <FiSun
                        className={styles.icon}
                        title="Switch to Light Mode"
                        onClick={toggleTheme}
                    />
                ) : (
                    <FiMoon
                        className={styles.icon}
                        title="Switch to Dark Mode"
                        onClick={toggleTheme}
                    />
                )}

                {/* Logout icon */}
                <FiLogOut
                    className={styles.icon}
                    title="Logout"
                    onClick={logout}
                />
            </div>
        </header>
    );
}

export default Header;
