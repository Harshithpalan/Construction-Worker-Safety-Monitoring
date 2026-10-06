import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import './Dashboard.css';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const Dashboard = () => {
  const { metrics, alerts, workers } = useSafety();

  const activeAlerts = alerts.filter(a => !a.resolved);
  const activeWorkers = workers.filter(w => w.status === 'active');

  const statusData = [
    { name: 'Active', value: activeWorkers.length, color: '#00C49F' },
    { name: 'Warning', value: workers.filter(w => w.status === 'warning').length, color: '#FFBB28' },
    { name: 'Inactive', value: workers.filter(w => w.status === 'inactive').length, color: '#FF8042' },
  ];

  const weeklyData = metrics.weeklyIncidents.map((incidents, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    incidents,
    ppe: metrics.ppeTrends[index]
  }));

  return (
    <div className="dashboard">
      <h2>Safety Dashboard</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <h3>Total Workers</h3>
            <p className="metric-value">{metrics.totalWorkers}</p>
            <span className="metric-sub">{activeWorkers.length} active</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon warning">
            <AlertTriangle size={24} />
          </div>
          <div className="metric-content">
            <h3>Active Alerts</h3>
            <p className="metric-value">{activeAlerts.length}</p>
            <span className="metric-sub">Requires attention</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon success">
            <Shield size={24} />
          </div>
          <div className="metric-content">
            <h3>PPE Compliance</h3>
            <p className="metric-value">{metrics.ppeCompliance.toFixed(0)}%</p>
            <span className="metric-sub">Current rate</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon info">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <h3>Safe Days</h3>
            <p className="metric-value">{metrics.safeDays}</p>
            <span className="metric-sub">No incidents</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Weekly Incidents & PPE Compliance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="incidents" fill="#FF8042" name="Incidents" />
              <Line yAxisId="right" type="monotone" dataKey="ppe" stroke="#00C49F" name="PPE %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Worker Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metric-card full-width">
        <div className="metric-icon info">
          <Clock size={24} />
        </div>
        <div className="metric-content">
          <h3>Incident Rate</h3>
          <p className="metric-value">{metrics.incidentRate}</p>
          <span className="metric-sub">Incidents per 1000 worker-hours</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
