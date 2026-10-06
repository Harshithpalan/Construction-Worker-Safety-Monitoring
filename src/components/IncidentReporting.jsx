import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Plus, Filter } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { formatDistanceToNow } from 'date-fns';
import './IncidentReporting.css';

const IncidentReporting = () => {
  const { incidents, addIncident } = useSafety();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    type: 'near_miss',
    description: '',
    location: '',
    severity: 'medium',
    reportedBy: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncident({
      ...formData,
      reportedBy: formData.reportedBy || 'Anonymous'
    });
    setFormData({
      type: 'near_miss',
      description: '',
      location: '',
      severity: 'medium',
      reportedBy: '',
    });
    setShowForm(false);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#ef4444';
      case 'investigating': return '#f59e0b';
      case 'resolved': return '#22c55e';
      default: return '#64748b';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filter === 'all') return true;
    return incident.severity === filter;
  });

  return (
    <div className="incident-reporting">
      <div className="header">
        <h2>Incident Reporting</h2>
        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Report Incident'}
        </button>
      </div>

      {showForm && (
        <div className="incident-form-container">
          <form className="incident-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Incident Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="near_miss">Near Miss</option>
                  <option value="injury">Injury</option>
                  <option value="equipment_failure">Equipment Failure</option>
                  <option value="property_damage">Property Damage</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Severity</label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what happened..."
                required
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Zone A, Building 2"
                  required
                />
              </div>
              <div className="form-group">
                <label>Reported By</label>
                <input
                  type="text"
                  value={formData.reportedBy}
                  onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                  placeholder="Your name (optional)"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="primary-btn">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="filter-bar">
        <Filter size={18} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Incidents</option>
          <option value="high">High Severity</option>
          <option value="medium">Medium Severity</option>
          <option value="low">Low Severity</option>
        </select>
      </div>

      <div className="incidents-list">
        {filteredIncidents.length === 0 ? (
          <div className="no-incidents">
            <FileText size={48} />
            <p>No incidents reported</p>
          </div>
        ) : (
          filteredIncidents.map(incident => (
            <div
              key={incident.id}
              className="incident-card"
              style={{
                borderLeftColor: getSeverityColor(incident.severity),
              }}
            >
              <div className="incident-header">
                <div className="incident-icon">
                  <AlertTriangle size={20} />
                </div>
                <div className="incident-info">
                  <h4>{incident.type.replace('_', ' ').toUpperCase()}</h4>
                  <p className="incident-description">{incident.description}</p>
                </div>
                <div
                  className="incident-status"
                  style={{ backgroundColor: getStatusColor(incident.status) }}
                >
                  {incident.status}
                </div>
              </div>

              <div className="incident-details">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span>{incident.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reported by:</span>
                  <span>{incident.reportedBy}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span>{formatDistanceToNow(new Date(incident.timestamp), { addSuffix: true })}</span>
                </div>
              </div>

              <div className="incident-footer">
                <span
                  className="severity-badge"
                  style={{
                    backgroundColor: getSeverityBg(incident.severity),
                    color: getSeverityColor(incident.severity),
                  }}
                >
                  {incident.severity.toUpperCase()} SEVERITY
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IncidentReporting;
