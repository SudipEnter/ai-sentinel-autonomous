
import React, { useState } from 'react';
import { AGENTS as INITIAL_AGENTS } from '../constants';
import { Agent } from '../types';
import Card from './common/Card';
import Button from './common/Button';

interface AgentOverviewProps {
  onOpenAnalysisModal: (url?: string) => void;
}

const Cog6ToothIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226l.558-.223a1.75 1.75 0 011.487 0l.558.223c.55.219 1.02.684 1.11 1.226l.099.542a1.75 1.75 0 001.506 1.506l.542.099c.542.09.684 1.02 1.226 1.11l.223.558a1.75 1.75 0 010 1.487l-.223.558c-.219.55-.684 1.02-1.226 1.11l-.542.099a1.75 1.75 0 00-1.506 1.506l-.099.542c-.09.542-.56 1.007-1.11 1.226l-.558.223a1.75 1.75 0 01-1.487 0l-.558-.223c-.55-.219-1.02-.684-1.11-1.226l-.099-.542a1.75 1.75 0 00-1.506-1.506l-.542-.099c-.542-.09-.684-1.02-1.226-1.11l-.223-.558a1.75 1.75 0 010-1.487l.223-.558c.219.55.684 1.02 1.226 1.11l.542-.099a1.75 1.75 0 001.506-1.506l.099-.542z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const AgentOverview: React.FC<AgentOverviewProps> = ({ onOpenAnalysisModal }) => {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [analysisUrl, setAnalysisUrl] = useState('');
  const [expandedAgentName, setExpandedAgentName] = useState<string | null>(null);

  const toggleAgent = (agentName: string) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.name === agentName ? { ...agent, enabled: !agent.enabled } : agent
      )
    );
  };

  const handleAnalyze = () => {
    if (analysisUrl.trim()) {
      onOpenAnalysisModal(analysisUrl);
    }
  };

  const handleToggleExpand = (agentName: string) => {
    setExpandedAgentName(prev => (prev === agentName ? null : agentName));
  };

  const handleConfigChange = (agentName: string, configId: string, newValue: string | number) => {
      setAgents(prevAgents => prevAgents.map(agent => {
          if (agent.name === agentName && agent.config) {
              const newConfig = agent.config.map(conf => {
                  if (conf.id === configId) {
                      const finalValue = conf.type === 'slider' ? Number(newValue) : newValue;
                      return { ...conf, value: finalValue };
                  }
                  return conf;
              });
              return { ...agent, config: newConfig };
          }
          return agent;
      }));
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-sentinel-text-primary sm:text-4xl">
          Autonomous Agent Framework
        </h2>
        <p className="mt-4 text-lg leading-8 text-sentinel-text-secondary">
          Meet the specialized agents that power the AI Sentinel platform.
        </p>
      </div>

      <Card className="mb-12 p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
                <h3 className="font-semibold text-lg text-sentinel-text-primary">Engage the Agents</h3>
                <p className="text-sm text-sentinel-text-secondary mt-1">Submit an asset URL for a deep, logical analysis by the entire agent framework.</p>
            </div>
            <div className="w-full md:w-auto flex-grow md:max-w-lg flex gap-2">
                <input 
                    type="url" 
                    placeholder="https://example.com" 
                    className="block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue sm:text-sm p-2"
                    value={analysisUrl}
                    onChange={(e) => setAnalysisUrl(e.target.value)}
                />
                <Button onClick={handleAnalyze} disabled={!analysisUrl.trim()}>Analyze</Button>
            </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.name} className={`p-0 transition-all duration-300 ${!agent.enabled ? 'opacity-60 bg-sentinel-bg-dark' : ''}`}>
            <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-sentinel-bg-dark">
                        {agent.icon}
                      </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-sentinel-text-primary">{agent.name}</h3>
                      <div className="flex items-center space-x-3 -mr-2">
                         {agent.config && (
                           <button 
                                onClick={() => handleToggleExpand(agent.name)} 
                                className="text-sentinel-text-secondary hover:text-sentinel-text-primary p-1 rounded-full hover:bg-sentinel-border"
                                aria-label={`Configure ${agent.name}`}
                           >
                               <Cog6ToothIcon />
                           </button>
                        )}
                        <button
                          type="button"
                          className={`${agent.enabled ? 'bg-sentinel-green' : 'bg-sentinel-border'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sentinel-blue focus:ring-offset-2 focus:ring-offset-sentinel-bg-dark`}
                          role="switch"
                          aria-checked={agent.enabled}
                          onClick={() => toggleAgent(agent.name)}
                          aria-label={`Enable ${agent.name}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`${agent.enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-sentinel-text-secondary">{agent.description}</p>
                  </div>
                </div>
            </div>
            {expandedAgentName === agent.name && agent.config && (
                <div className="bg-sentinel-bg-dark border-t border-sentinel-border p-4 space-y-4">
                    {agent.config.map(conf => (
                        <div key={conf.id}>
                            <label className="block text-sm font-medium text-sentinel-text-secondary">{conf.label}</label>
                            {conf.type === 'slider' && (
                                <div className="flex items-center space-x-3 mt-1">
                                    <input 
                                        type="range"
                                        min={conf.min}
                                        max={conf.max}
                                        step={conf.step}
                                        value={conf.value}
                                        onChange={(e) => handleConfigChange(agent.name, conf.id, e.target.value)}
                                        className="w-full h-2 bg-sentinel-border rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm text-sentinel-text-primary font-mono bg-sentinel-bg-light px-2 py-1 rounded-md">
                                        {conf.value}{conf.unit}
                                    </span>
                                </div>
                            )}
                            {conf.type === 'select' && (
                                <select 
                                    value={conf.value}
                                    onChange={(e) => handleConfigChange(agent.name, conf.id, e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-sentinel-bg-light border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue sm:text-sm p-2"
                                >
                                    {conf.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentOverview;
