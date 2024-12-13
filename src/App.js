import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCard from './components/BalanceCard/BalanceCard';
import Marketplace from './components/Marketplace/Marketplace';
import RegistrationPage from './pages/RegistrationPage';
import ProducingStation from './stations/ProducingStation';
import ConsumerStation from './stations/ConsumerStation';
import { useTheme } from './context/ThemeContext';
import Settings from './stations/Settings';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [balances, setBalances] = useState({ ETH: 0, CC: 0 });
    const [walletConnected, setWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(
        localStorage.getItem('isRegistered') === 'true'
    );

    const { theme } = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const logout = () => {
        localStorage.clear(); // Clear local storage
        setIsRegistered(false); // Reset registration state
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setProvider(provider);
                setAccount(address);
                setWalletConnected(true);
            } catch (error) {
                alert(`Error connecting to wallet: ${error.message}`);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    };

    const fetchBalances = async () => {
        if (provider && account) {
            setIsLoading(true);
            try {
                const balance = await provider.getBalance(account);
                const balanceInEth = ethers.utils.formatEther(balance);
                setBalances({
                    ETH: parseFloat(balanceInEth).toFixed(4),
                    CC: 100.0,
                });
            } catch (error) {
                console.error('Error fetching balances:', error);
                alert('Failed to fetch wallet balances.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (walletConnected) {
            fetchBalances();
        }
    }, [walletConnected, account]);

    return (
        <Router>
            <div className={`app-container ${theme}-theme`}>
                {isRegistered ? (
                    <>
                        <Sidebar isSidebarOpen={isSidebarOpen} />
                        <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                            <Header toggleSidebar={toggleSidebar} logout={logout} />
                            <Routes>
                                <Route
                                    path="/dashboard"
                                    element={
                                        <>
                                            <section className="balance-section">
                                                {isLoading ? (
                                                    <p>Loading balances...</p>
                                                ) : (
                                                    <>
                                                        <BalanceCard
                                                            type="ETH"
                                                            balance={balances.ETH}
                                                            onAddMore={connectWallet}
                                                        />
                                                        <BalanceCard
                                                            type="CC"
                                                            balance={balances.CC}
                                                            onAddMore={() =>
                                                                alert('Refreshing Carbon Credits...')
                                                            }
                                                        />
                                                    </>
                                                )}
                                            </section>
                                        </>
                                    }
                                />
                                <Route path="/producing-stations" element={<ProducingStation />} />
                                <Route path="/consuming-stations" element={<ConsumerStation />} />
                                <Route path="/settings" element = {<Settings/>} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </main>
                    </>
                ) : (
                    <Routes>
                        <Route
                            path="/registration"
                            element={<RegistrationPage setIsRegistered={setIsRegistered} />}
                        />
                        <Route path="*" element={<Navigate to="/registration" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
