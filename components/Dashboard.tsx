
import React, { useState } from 'react';
import { Incident } from '../types';
import IncidentList from './IncidentList';
import IncidentDetail from './IncidentDetail';
import Card from './common/Card';
import Button from './common/Button';

interface DashboardProps {
  incidents: Incident[];
  onUpdateIncident: (incident: Incident) => void;
  onOpenAnalysisModal: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ incidents, onUpdateIncident, onOpenAnalysisModal }) => {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(incidents.length > 0 ? incidents[0].id : null);
  
  const selectedIncident = incidents.find((inc) => inc.id === selectedIncidentId);
  const openIncidents = incidents.filter(i => i.status !== 'Resolved' && i.status !== 'Rejected').length;
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-sentinel-text-primary">Incidents</h2>
              <span className="bg-sentinel-blue/20 text-sentinel-blue text-sm font-medium px-3 py-1 rounded-full">
                  {openIncidents} Open
              </span>
          </div>
          
          <Card className="mb-4 p-4">
              <div className="flex items-center justify-between gap-4">
                  <div>
                      <h3 className="font-semibold text-sentinel-text-primary">Analyze Asset</h3>
                      <p className="text-sm text-sentinel-text-secondary">Submit a website, folder, or file for deep analysis.</p>
                  </div>
                  <Button onClick={onOpenAnalysisModal} variant="secondary">
                      Submit
                  </Button>
              </div>
          </Card>

          <IncidentList
            incidents={incidents}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={setSelectedIncidentId}
          />
        </div>
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <IncidentDetail
              key={selectedIncident.id}
              incident={selectedIncident}
              onUpdate={onUpdateIncident}
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-lg font-medium text-sentinel-text-primary">No Incident Selected</h3>
                <p className="mt-1 text-sm text-sentinel-text-secondary">
                  Please select an incident from the list to view its details.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
