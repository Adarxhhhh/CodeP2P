import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import BalanceCard from './components/BalanceCard/BalanceCard';
import Marketplace from './components/Marketplace/Marketplace';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [balances, setBalances] = useState({ ETH: 0, CC: 0 });
    const [walletConnected, setWalletConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []); // Request account access
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setProvider(provider);
                setAccount(address);
                setWalletConnected(true);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("Please install MetaMask!");
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
            // For demonstration, we’re setting a static CC balance.
            // Replace this logic if you have a contract or source for Carbon Credits (CC) balance.
            setBalances((prevBalances) => ({
                ...prevBalances,
                CC: 100.0, // Example CC balance; replace with dynamic value if needed
            }));
        }
    };

    // Automatically fetch balances when wallet is connected
    useEffect(() => {
        if (walletConnected) {
            fetchBalances();
        }
    }, [walletConnected, account]);

    return (
        <div className="app-container">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <section className="balance-section">
                    <BalanceCard 
                        type="ETH" 
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

export default App;
