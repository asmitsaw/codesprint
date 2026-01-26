import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScanPage from './pages/ScanPage';
import LiveMap from './pages/LiveMap';
import Ticketing from './pages/Ticketing';
import DigitalTicket from './pages/DigitalTicket';
import LiveStatus from './pages/LiveStatus';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/digital-ticket" element={<DigitalTicket />} />
        <Route path="/live-status" element={<LiveStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
