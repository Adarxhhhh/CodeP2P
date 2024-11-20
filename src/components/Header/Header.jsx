import { FiSun, FiUser, FiMenu } from 'react-icons/fi';
import styles from './Header.module.css';

function Header({ toggleSidebar }) {
    return (
        <header className={styles.header}>
            <input type="text" className={styles.searchBar} placeholder="Search here..." />
            <div className={styles.icons}>
                <FiSun className={styles.icon} title="Light Mode" />
                <FiMenu className={styles.burgerIcon} onClick={toggleSidebar} title="Toggle Sidebar" />
                <FiUser className={styles.icon} title="Account" />
            </div>
        </header>
    );
}

export default Header;
