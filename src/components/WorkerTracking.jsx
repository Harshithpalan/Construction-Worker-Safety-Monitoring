import React, { useState } from 'react';
import { MapPin, User, Shield, AlertCircle } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { mockSiteZones } from '../data/mockData';
import './WorkerTracking.css';

const WorkerTracking = () => {
  const { workers, updateWorkerStatus } = useSafety();
  const [selectedWorker, setSelectedWorker] = useState(null);

  const getZoneColor = (type) => {
    switch (type) {
      case 'restricted': return '#fee2e2';
      case 'hazard': return '#fef3c7';
      default: return '#dcfce7';
    }
  };

  const getZoneBorderColor = (type) => {
    switch (type) {
      case 'restricted': return '#ef4444';
      case 'hazard': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'inactive': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div className="worker-tracking">
      <h2>Worker Tracking</h2>
      
      <div className="tracking-layout">
        <div className="map-container">
          <div className="site-map">
            {mockSiteZones.map(zone => (
              <div
                key={zone.id}
                className="zone"
                style={{
                  left: `${zone.bounds.x}%`,
                  top: `${zone.bounds.y}%`,
                  width: `${zone.bounds.width}%`,
                  height: `${zone.bounds.height}%`,
                  backgroundColor: getZoneColor(zone.type),
                  borderColor: getZoneBorderColor(zone.type),
                }}
              >
                <span className="zone-label">{zone.name}</span>
              </div>
            ))}
            
            {workers.map(worker => (
              <div
                key={worker.id}
                className={`worker-marker ${selectedWorker?.id === worker.id ? 'selected' : ''}`}
                style={{
                  left: `${worker.lastLocation.x}%`,
                  top: `${worker.lastLocation.y}%`,
                  backgroundColor: getStatusColor(worker.status),
                }}
                onClick={() => setSelectedWorker(worker)}
              >
                <User size={16} />
              </div>
            ))}
          </div>
          
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#dcfce7', borderColor: '#22c55e' }}></div>
              <span>General Zone</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#fef3c7', borderColor: '#f59e0b' }}></div>
              <span>Hazard Zone</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#fee2e2', borderColor: '#ef4444' }}></div>
              <span>Restricted Zone</span>
            </div>
          </div>
        </div>

        <div className="workers-list">
          <h3>Workers On Site</h3>
          {workers.map(worker => (
            <div
              key={worker.id}
              className={`worker-card ${selectedWorker?.id === worker.id ? 'selected' : ''}`}
              onClick={() => setSelectedWorker(worker)}
            >
              <div className="worker-header">
                <div className="worker-info">
                  <div className="worker-name">{worker.name}</div>
                  <div className="worker-role">{worker.role}</div>
                </div>
                <div className="worker-status" style={{ backgroundColor: getStatusColor(worker.status) }}>
                  {worker.status}
                </div>
              </div>
              
              <div className="worker-details">
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>Zone: {worker.lastLocation.x}, {worker.lastLocation.y}</span>
                </div>
                <div className="detail-item">
                  <Shield size={16} />
                  <span>PPE: {Object.values(worker.ppeStatus).filter(Boolean).length}/3 compliant</span>
                </div>
                {!worker.ppeStatus.helmet && (
                  <div className="ppe-warning">
                    <AlertCircle size={16} />
                    <span>Missing helmet</span>
                  </div>
                )}
                {!worker.ppeStatus.vest && (
                  <div className="ppe-warning">
                    <AlertCircle size={16} />
                    <span>Missing safety vest</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerTracking;
