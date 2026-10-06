export const mockWorkers = [
  { id: 1, name: 'John Smith', role: 'Foreman', status: 'active', lastLocation: { x: 30, y: 40 }, ppeStatus: { helmet: true, vest: true, boots: true }, shiftStart: '07:00' },
  { id: 2, name: 'Mike Johnson', role: 'Electrician', status: 'active', lastLocation: { x: 50, y: 60 }, ppeStatus: { helmet: true, vest: false, boots: true }, shiftStart: '07:30' },
  { id: 3, name: 'Sarah Williams', role: 'Safety Officer', status: 'active', lastLocation: { x: 70, y: 30 }, ppeStatus: { helmet: true, vest: true, boots: true }, shiftStart: '06:45' },
  { id: 4, name: 'David Brown', role: 'Crane Operator', status: 'warning', lastLocation: { x: 20, y: 80 }, ppeStatus: { helmet: true, vest: true, boots: true }, shiftStart: '08:00' },
  { id: 5, name: 'Emily Davis', role: 'Welder', status: 'active', lastLocation: { x: 60, y: 20 }, ppeStatus: { helmet: false, vest: true, boots: true }, shiftStart: '07:15' },
];

export const mockAlerts = [
  { id: 1, type: 'ppe_violation', severity: 'high', message: 'Mike Johnson not wearing safety vest', timestamp: new Date(Date.now() - 300000), workerId: 2, resolved: false },
  { id: 2, type: 'zone_entry', severity: 'medium', message: 'David Brown entered restricted crane zone', timestamp: new Date(Date.now() - 600000), workerId: 4, resolved: false },
  { id: 3, type: 'ppe_violation', severity: 'high', message: 'Emily Davis not wearing helmet', timestamp: new Date(Date.now() - 900000), workerId: 5, resolved: false },
  { id: 4, type: 'fatigue', severity: 'medium', message: 'David Brown showing signs of fatigue', timestamp: new Date(Date.now() - 1800000), workerId: 4, resolved: true },
];

export const mockIncidents = [
  { id: 1, type: 'near_miss', description: 'Falling object missed worker by 2 feet', location: 'Zone A', severity: 'medium', reportedBy: 'Sarah Williams', timestamp: new Date(Date.now() - 86400000), status: 'resolved' },
  { id: 2, type: 'injury', description: 'Minor cut on hand from sharp equipment', location: 'Zone B', severity: 'low', reportedBy: 'John Smith', timestamp: new Date(Date.now() - 172800000), status: 'resolved' },
  { id: 3, type: 'equipment_failure', description: 'Power tool malfunction', location: 'Zone C', severity: 'high', reportedBy: 'Mike Johnson', timestamp: new Date(Date.now() - 259200000), status: 'investigating' },
];

export const mockSafetyMetrics = {
  totalWorkers: 5,
  activeWorkers: 4,
  activeAlerts: 3,
  ppeCompliance: 80,
  incidentRate: 0.5,
  safeDays: 42,
  weeklyIncidents: [0, 1, 0, 2, 0, 1, 0],
  ppeTrends: [75, 78, 80, 82, 80, 85, 80],
};

export const mockSiteZones = [
  { id: 1, name: 'Zone A - Foundation', bounds: { x: 0, y: 0, width: 40, height: 40 }, type: 'general' },
  { id: 2, name: 'Zone B - Electrical', bounds: { x: 40, y: 0, width: 30, height: 40 }, type: 'hazard' },
  { id: 3, name: 'Zone C - Crane Operations', bounds: { x: 70, y: 0, width: 30, height: 50 }, type: 'restricted' },
  { id: 4, name: 'Zone D - Storage', bounds: { x: 0, y: 40, width: 50, height: 30 }, type: 'general' },
  { id: 5, name: 'Zone E - Welding', bounds: { x: 50, y: 40, width: 50, height: 30 }, type: 'hazard' },
];
