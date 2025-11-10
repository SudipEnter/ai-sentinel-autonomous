
import React from 'react';
import { Priority, IncidentStatus } from '../../types';

interface TagProps {
  label: string;
  type: 'priority' | 'status' | 'default';
  value: Priority | IncidentStatus | string;
}

const Tag: React.FC<TagProps> = ({ label, type, value }) => {
  const colorClasses = {
    priority: {
      [Priority.CRITICAL]: 'bg-red-500/20 text-red-400 border-red-500/30',
      [Priority.HIGH]: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      [Priority.MEDIUM]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      [Priority.LOW]: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    status: {
      [IncidentStatus.DETECTED]: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      [IncidentStatus.TRIAGED]: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      [IncidentStatus.PENDING_APPROVAL]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      [IncidentStatus.REMEDIATING]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      [IncidentStatus.RESOLVED]: 'bg-green-500/20 text-green-400 border-green-500/30',
      [IncidentStatus.REJECTED]: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
    default: 'bg-gray-700/50 text-gray-300 border-gray-600/50',
  };

  const selectedColor = type === 'default' ? colorClasses.default : colorClasses[type][value] || colorClasses.default;
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${selectedColor}`}>
      <span className="font-semibold mr-1.5">{label}:</span>
      <span>{value}</span>
    </div>
  );
};

export default Tag;
