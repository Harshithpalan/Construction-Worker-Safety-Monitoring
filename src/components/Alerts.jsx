import React from 'react';
import { AlertTriangle, CheckCircle, Clock, User, X, Shield, MapPin } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { formatDistanceToNow } from 'date-fns';
import './Alerts.css';

const Alerts = () => {
  const { alerts, resolveAlert, workers } = useSafety();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#64748b';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return '#fef2f2';
      case 'medium': return '#fef3c7';
      case 'low': return '#dbeafe';
      default: return '#f1f5f9';
    }
  };

  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'ppe_violation': return <Shield size={20} />;
      case 'zone_entry': return <MapPin size={20} />;
      case 'fatigue': return <Clock size={20} />;
      default: return <AlertTriangle size={20} />;
    }
  };

  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  return (
    <div className="alerts">
      <h2>Safety Alerts</h2>
      
      <div className="alerts-summary">
        <div className="summary-card high">
          <AlertTriangle size={24} />
          <div>
            <p className="summary-value">{activeAlerts.filter(a => a.severity === 'high').length}</p>
            <p className="summary-label">High Priority</p>
          </div>
        </div>
        <div className="summary-card medium">
          <AlertTriangle size={24} />
          <div>
            <p className="summary-value">{activeAlerts.filter(a => a.severity === 'medium').length}</p>
            <p className="summary-label">Medium Priority</p>
          </div>
        </div>
        <div className="summary-card low">
          <AlertTriangle size={24} />
          <div>
            <p className="summary-value">{activeAlerts.filter(a => a.severity === 'low').length}</p>
            <p className="summary-label">Low Priority</p>
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <h3>Active Alerts ({activeAlerts.length})</h3>
        {activeAlerts.length === 0 ? (
          <div className="no-alerts">
            <CheckCircle size={48} />
            <p>No active alerts</p>
          </div>
        ) : (
          <div className="alerts-list">
            {activeAlerts.map(alert => {
              const worker = workers.find(w => w.id === alert.workerId);
              return (
                <div
                  key={alert.id}
                  className="alert-card"
                  style={{
                    borderLeftColor: getSeverityColor(alert.severity),
                    backgroundColor: getSeverityBg(alert.severity),
                  }}
                >
                  <div className="alert-header">
                    <div className="alert-icon">
                      {getAlertTypeIcon(alert.type)}
                    </div>
                    <div className="alert-info">
                      <h4>{alert.message}</h4>
                      {worker && (
                        <div className="alert-worker">
                          <User size={14} />
                          <span>{worker.name}</span>
                        </div>
                      )}
                    </div>
                    <div className="alert-actions">
                      <button
                        className="resolve-btn"
                        onClick={() => resolveAlert(alert.id)}
                        title="Mark as resolved"
                      >
                        <CheckCircle size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="alert-footer">
                    <span className="alert-time">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </span>
                    <span className={`alert-severity ${alert.severity}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {resolvedAlerts.length > 0 && (
        <div className="alerts-section">
          <h3>Resolved Alerts ({resolvedAlerts.length})</h3>
          <div className="alerts-list resolved">
            {resolvedAlerts.map(alert => {
              const worker = workers.find(w => w.id === alert.workerId);
              return (
                <div
                  key={alert.id}
                  className="alert-card resolved"
                >
                  <div className="alert-header">
                    <div className="alert-icon resolved">
                      <CheckCircle size={20} />
                    </div>
                    <div className="alert-info">
                      <h4>{alert.message}</h4>
                      {worker && (
                        <div className="alert-worker">
                          <User size={14} />
                          <span>{worker.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="alert-footer">
                    <span className="alert-time">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </span>
                    <span className="alert-severity resolved">RESOLVED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
