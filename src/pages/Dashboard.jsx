import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import BalanceCard from '../components/BalanceCard/BalanceCard';
import Marketplace from '../components/MarketplaceComponent/MarketplaceComponent';
import { useTheme } from './context/ThemeContext'; // Import useTheme
// import './App.css';

function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [balances, setBalances] = useState({ ETH: 0, CC: 0 });
    const [walletConnected, setWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    const { theme } = useTheme(); // Get the current theme from ThemeContext

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []); // Request account access
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setProvider(provider);
                setAccount(address);
                setWalletConnected(true);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    // Fetch ETH balance from MetaMask wallet
    const fetchBalances = async () => {
        if (provider && account) {
            const balance = await provider.getBalance(account);
            const balanceInEth = ethers.utils.formatEther(balance);
            setBalances((prevBalances) => ({
                ...prevBalances,
                ETH: parseFloat(balanceInEth).toFixed(4),
            }));
            // Static CC balance for demonstration purposes
            setBalances((prevBalances) => ({
                ...prevBalances,
                CC: 100.0, // Replace with dynamic value if needed
            }));
        }
    };

    useEffect(() => {
        if (walletConnected) {
            fetchBalances();
        }
    }, [walletConnected, account, provider]);

    return (
        <div className={`app-container ${theme}-theme`}>
            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                isStationsToggleable={true}
                isInsideStations={false}
            />
            <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <section className="balance-section">
                    <BalanceCard 
                        type="ROSE" 
                        balance={balances.ETH} 
                        onAddMore={connectWallet} 
                    />
                    <BalanceCard 
                        type="CC" 
                        balance={balances.CC} 
                        onAddMore={connectWallet} 
                    />
                </section>
                <Marketplace />
            </main>
        </div>
    );
}

export default Dashboard;