import React from 'react';
import { FiMenu, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

function Header({ toggleSidebar }) {
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

            {/* Right-side icons: Light/Dark mode toggle and account actions */}
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

                {/* Account icon */}
                <FiUser
                    className={styles.icon}
                    title="Account"
                    onClick={() => alert('Account actions here!')}
                />
            </div>
        </header>
    );
}

export default Header;
