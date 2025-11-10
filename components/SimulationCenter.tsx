
import React from 'react';
import Card from './common/Card';
import Button from './common/Button';

const SimulationCenter: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-sentinel-text-primary sm:text-4xl">
          Red-Team Simulation Center
        </h2>
        <p className="mt-4 text-lg leading-8 text-sentinel-text-secondary">
          Validate defenses and train operators in a safe, sandboxed environment.
        </p>
      </div>
      <Card className="max-w-3xl mx-auto p-8">
        <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-900/50">
                <svg className="h-6 w-6 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
          <h3 className="mt-4 text-lg font-semibold text-sentinel-text-primary">Authorization Required</h3>
          <p className="mt-2 text-sm text-sentinel-text-secondary">
            Active testing and red-team simulations must only be conducted in controlled, isolated lab environments.
            These actions require explicit, written authorization and a signed Rules of Engagement document before initiation.
          </p>
          <p className="mt-2 text-sm text-sentinel-text-secondary font-semibold">
            Unauthorized testing against production systems is strictly prohibited.
          </p>
        </div>
        <div className="mt-8 border-t border-sentinel-border pt-6">
            <h4 className="font-semibold text-sentinel-text-primary">Initiate New Simulation</h4>
            <p className="text-sm text-sentinel-text-secondary mt-1">Define the scope for a new sandboxed simulation run.</p>
             <form className="mt-4 space-y-4">
                 <div>
                    <label htmlFor="scenario" className="block text-sm font-medium text-sentinel-text-secondary">Select Scenario</label>
                    <select id="scenario" name="scenario" className="mt-1 block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue sm:text-sm">
                        <option>WordPress Compromise (Backdoor)</option>
                        <option>Lateral Movement (Encoded PowerShell)</option>
                        <option>Cloud Account Takeover (Anomalous Login)</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="scope" className="block text-sm font-medium text-sentinel-text-secondary">Target Lab Environment</label>
                    <input type="text" name="scope" id="scope" disabled value="lab-env-westeurope-01" className="mt-1 block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm sm:text-sm text-sentinel-text-secondary" />
                </div>
                <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                        <input id="auth" aria-describedby="auth-description" name="auth" type="checkbox" className="h-4 w-4 rounded border-sentinel-border bg-sentinel-bg-dark text-sentinel-blue focus:ring-sentinel-blue" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="auth" className="font-medium text-sentinel-text-primary">I confirm I have signed authorization.</label>
                        <p id="auth-description" className="text-sentinel-text-secondary">This action will be logged with your identity.</p>
                    </div>
                </div>
                 <Button type="button" className="w-full">
                    Initiate Sandboxed Simulation
                </Button>
            </form>
        </div>
      </Card>
    </div>
  );
};

export default SimulationCenter;
