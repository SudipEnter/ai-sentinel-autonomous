
import React, { useState } from 'react';
import { Incident } from './types';
import { MOCK_INCIDENTS } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ServiceCatalogue from './components/ServiceCatalogue';
import SimulationCenter from './components/SimulationCenter';
import AgentOverview from './components/AgentOverview';
import Modal from './components/common/Modal';
import AssetAnalysisForm from './components/AssetAnalysisForm';

export type View = 'dashboard' | 'services' | 'agents' | 'simulation';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [initialAnalysisUrl, setInitialAnalysisUrl] = useState<string | undefined>(undefined);

  const updateIncident = (updatedIncident: Incident) => {
    setIncidents(
      incidents.map((inc) =>
        inc.id === updatedIncident.id ? updatedIncident : inc
      )
    );
  };

  const handleOpenAnalysisModal = (url?: string) => {
    setInitialAnalysisUrl(url);
    setIsAnalysisModalOpen(true);
  };

  const handleCloseAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
    // Clear the initial URL after a short delay to allow the modal to close gracefully
    setTimeout(() => setInitialAnalysisUrl(undefined), 300);
  };


  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard incidents={incidents} onUpdateIncident={updateIncident} onOpenAnalysisModal={handleOpenAnalysisModal} />;
      case 'services':
        return <ServiceCatalogue />;
      case 'agents':
        return <AgentOverview onOpenAnalysisModal={handleOpenAnalysisModal} />;
      case 'simulation':
        return <SimulationCenter />;
      default:
        return <Dashboard incidents={incidents} onUpdateIncident={updateIncident} onOpenAnalysisModal={handleOpenAnalysisModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-sentinel-bg-dark font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderContent()}
      </main>
      <Modal
        isOpen={isAnalysisModalOpen}
        onClose={handleCloseAnalysisModal}
        title="Analyze Your Assets for Threats"
        size="5xl"
        hasPadding={false}
      >
        <AssetAnalysisForm key={initialAnalysisUrl} initialUrl={initialAnalysisUrl} />
      </Modal>
    </div>
  );
};

export default App;
