import React from 'react';
import { SERVICES } from '../constants';
import Card from './common/Card';
import AssetAnalysisForm from './AssetAnalysisForm';

const ServiceCatalogue: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-sentinel-text-primary sm:text-4xl">
          Cyber Defense Service Orchestration
        </h2>
        <p className="mt-4 text-lg leading-8 text-sentinel-text-secondary">
          Initiate an automated analysis or browse our modular services.
        </p>
      </div>

      {/* New Asset Analysis Section */}
      <AssetAnalysisForm />

      <div>
        <h3 className="text-2xl font-bold text-sentinel-text-primary mb-6 text-center">
            Service Catalogue
        </h3>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card key={service.title} className="p-6 text-center flex flex-col items-center">
              <div className="mb-4 flex items-center justify-center h-16 w-16 rounded-lg bg-sentinel-bg-dark">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-sentinel-text-primary">{service.title}</h3>
              <p className="mt-2 text-sm text-sentinel-text-secondary">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalogue;