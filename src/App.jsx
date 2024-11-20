import Dashboard from './pages/Dashboard';
import ConsumingStations from './pages/Stations/ConsumingStations';
import ProducingStations from './pages/Stations/ProducingStations';
import Marketplace from './pages/Marketplace';
import Settings from './pages/Settings';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/producing-stations" element={<ProducingStations/>} />
        <Route path="/consuming-stations" element={<ConsumingStations/>} />
        <Route path="/marketplace" element={<Marketplace/>} />
        <Route path="/settings" element={<Settings/>} />
        {/* <Route path="*" element={<PageNotFound/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;