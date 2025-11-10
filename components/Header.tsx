
import React from 'react';
import type { View } from '../App';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-sentinel-blue">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);


const NavItem: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-sentinel-bg-light text-sentinel-text-primary'
        : 'text-sentinel-text-secondary hover:bg-sentinel-border hover:text-sentinel-text-primary'
    }`}
  >
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-sentinel-bg-dark border-b border-sentinel-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
             <div className="flex-shrink-0 flex items-center space-x-2">
                <ShieldIcon />
                 <h1 className="text-xl font-bold text-sentinel-text-primary tracking-wider">
                    AI Sentinel
                 </h1>
             </div>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            <NavItem label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
            <NavItem label="Service Catalogue" isActive={activeView === 'services'} onClick={() => setActiveView('services')} />
            <NavItem label="Agent Overview" isActive={activeView === 'agents'} onClick={() => setActiveView('agents')} />
            <NavItem label="Simulation Center" isActive={activeView === 'simulation'} onClick={() => setActiveView('simulation')} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
