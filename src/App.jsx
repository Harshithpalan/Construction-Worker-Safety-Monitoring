import React, { useState } from 'react';
import { SafetyProvider, useSafety } from './context/SafetyContext';
import Dashboard from './components/Dashboard';
import WorkerTracking from './components/WorkerTracking';
import Alerts from './components/Alerts';
import IncidentReporting from './components/IncidentReporting';
import { LayoutDashboard, MapPin, AlertTriangle, FileText, HardHat, Activity } from 'lucide-react';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isConnected } = useSafety();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tracking', label: 'Worker Tracking', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'incidents', label: 'Incidents', icon: FileText },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <HardHat size={32} />
            <h1>SafetyMonitor</h1>
          </div>
          <div className="connection-status">
            <Activity size={16} />
            <span className={isConnected ? 'connected' : 'disconnected'}>
              {isConnected ? 'Live' : 'Offline'}
            </span>
          </div>
        </div>
      </header>

      <div className="app-body">
        <nav className="sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <main className="main-content">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tracking' && <WorkerTracking />}
          {activeTab === 'alerts' && <Alerts />}
          {activeTab === 'incidents' && <IncidentReporting />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <SafetyProvider>
      <AppContent />
    </SafetyProvider>
  );
}

export default App;
