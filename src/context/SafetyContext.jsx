import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockWorkers, mockAlerts, mockIncidents, mockSafetyMetrics } from '../data/mockData';

const SafetyContext = createContext();

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};

export const SafetyProvider = ({ children }) => {
  const [workers, setWorkers] = useState(mockWorkers);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [incidents, setIncidents] = useState(mockIncidents);
  const [metrics, setMetrics] = useState(mockSafetyMetrics);
  const [isConnected, setIsConnected] = useState(true);

  const addAlert = useCallback((alert) => {
    setAlerts(prev => [{ ...alert, id: Date.now(), timestamp: new Date(), resolved: false }, ...prev]);
  }, []);

  const resolveAlert = useCallback((alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  }, []);

  const addIncident = useCallback((incident) => {
    setIncidents(prev => [{ ...incident, id: Date.now(), timestamp: new Date(), status: 'open' }, ...prev]);
  }, []);

  const updateWorkerStatus = useCallback((workerId, status) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === workerId ? { ...worker, status } : worker
    ));
  }, []);

  const updateWorkerLocation = useCallback((workerId, location) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === workerId ? { ...worker, lastLocation: location } : worker
    ));
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate worker movement
      setWorkers(prev => prev.map(worker => ({
        ...worker,
        lastLocation: {
          x: Math.max(0, Math.min(100, worker.lastLocation.x + (Math.random() - 0.5) * 5)),
          y: Math.max(0, Math.min(100, worker.lastLocation.y + (Math.random() - 0.5) * 5))
        }
      })));

      // Simulate random PPE compliance changes
      if (Math.random() < 0.1) {
        const randomWorker = Math.floor(Math.random() * workers.length);
        setWorkers(prev => prev.map((worker, index) => {
          if (index === randomWorker) {
            const ppeItem = ['helmet', 'vest', 'boots'][Math.floor(Math.random() * 3)];
            return {
              ...worker,
              ppeStatus: {
                ...worker.ppeStatus,
                [ppeItem]: !worker.ppeStatus[ppeItem]
              }
            };
          }
          return worker;
        }));

        // Add alert for PPE violation
        const worker = workers[randomWorker];
        if (worker) {
          addAlert({
            type: 'ppe_violation',
            severity: 'high',
            message: `${worker.name} PPE status changed`,
            workerId: worker.id
          });
        }
      }

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        ppeCompliance: Math.max(70, Math.min(100, prev.ppeCompliance + (Math.random() - 0.5) * 5))
      }));

    }, 3000);

    return () => clearInterval(interval);
  }, [workers, addAlert]);

  const value = {
    workers,
    alerts,
    incidents,
    metrics,
    isConnected,
    addAlert,
    resolveAlert,
    addIncident,
    updateWorkerStatus,
    updateWorkerLocation,
  };

  return (
    <SafetyContext.Provider value={value}>
      {children}
    </SafetyContext.Provider>
  );
};
