
import React from 'react';
import { Incident, Priority, IncidentStatus } from '../types';
import Card from './common/Card';
import Tag from './common/Tag';

interface IncidentListProps {
  incidents: Incident[];
  selectedIncidentId: string | null;
  onSelectIncident: (id: string) => void;
}

const PriorityIndicator: React.FC<{ priority: Priority }> = ({ priority }) => {
  const color = {
    [Priority.CRITICAL]: 'bg-red-500',
    [Priority.HIGH]: 'bg-orange-500',
    [Priority.MEDIUM]: 'bg-yellow-500',
    [Priority.LOW]: 'bg-green-500',
  };
  return <span className={`w-3 h-3 rounded-full ${color[priority]}`}></span>;
};


const IncidentList: React.FC<IncidentListProps> = ({
  incidents,
  selectedIncidentId,
  onSelectIncident,
}) => {
  return (
    <div className="space-y-3 max-h-[80vh] overflow-y-auto pr-2">
      {incidents.map((incident) => (
        <Card
          key={incident.id}
          onClick={() => onSelectIncident(incident.id)}
          className={`p-4 ${
            selectedIncidentId === incident.id ? 'border-sentinel-blue ring-2 ring-sentinel-blue' : ''
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
                <PriorityIndicator priority={incident.priority} />
                <h3 className="text-sm font-semibold text-sentinel-text-primary truncate">{incident.title}</h3>
            </div>
            <span className="text-xs text-sentinel-text-secondary">{incident.id}</span>
          </div>
          <p className="text-xs text-sentinel-text-secondary mb-3">{incident.source}</p>
          <div className="flex flex-wrap gap-2">
            <Tag label="Priority" type="priority" value={incident.priority} />
            <Tag label="Status" type="status" value={incident.status} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IncidentList;
