
import React, { useState } from 'react';
import { Incident, RemediationStep, IncidentStatus } from '../types';
import Card from './common/Card';
import Tag from './common/Tag';
import Button from './common/Button';
import Modal from './common/Modal';

interface IncidentDetailProps {
  incident: Incident;
  onUpdate: (incident: Incident) => void;
}

// Icons for Timeline
const InformationCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);
const CheckCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const XCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const WrenchScrewdriverIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.192-.857l-2.078-2.078a3.286 3.286 0 00-4.644 0l-3.03 2.496m0 0l-1.07-1.07a3.286 3.286 0 00-4.644 0l.004.005 4.64 4.64-.005-.004a3.286 3.286 0 000-4.644l1.07-1.07m6.115 5.115l-2.496 3.03a3.286 3.286 0 01-4.644 0l-3.03-2.496a3.286 3.286 0 010-4.644l2.496-3.03m0 0v-.008c.38.245.74.545 1.054.886l2.078 2.078a3.286 3.286 0 010 4.644l-2.078 2.078a3.286 3.286 0 01-.886 1.054V15.17z" />
  </svg>
);
// Icons for Remediation Steps
const CpuChipIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M15.75 21v-1.5m-6-1.5H8.25m7.5 0h-1.5M12 21.75v-1.5M13.5 4.5v-1.5M13.5 12h-3M12 13.5v-3m0-6v3m0 9v3" />
    </svg>
);
const UserIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


interface TimelineEvent {
    title: string;
    timestamp: string;
    description: string;
    icon: React.ReactNode;
}

const generateTimelineEvents = (incident: Incident): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    const baseTime = new Date(incident.timestamp);
    let currentTime = new Date(baseTime.getTime());

    const addEventAfterDelay = (title: string, description: string, icon: React.ReactNode, minutes: number) => {
        currentTime.setMinutes(currentTime.getMinutes() + minutes);
        events.push({ title, timestamp: currentTime.toLocaleString(), description, icon });
    };

    // 1. Always start with detection
    events.push({
        title: 'Incident Detected',
        timestamp: baseTime.toLocaleString(),
        description: `Threat detected by ${incident.source}.`,
        icon: <InformationCircleIcon className="w-full h-full text-sentinel-blue" />,
    });

    const statusOrder: IncidentStatus[] = [
        IncidentStatus.DETECTED,
        IncidentStatus.TRIAGED,
        IncidentStatus.PENDING_APPROVAL,
        IncidentStatus.REMEDIATING,
        IncidentStatus.RESOLVED,
    ];

    const currentStatusIndex = statusOrder.indexOf(incident.status);

    if (currentStatusIndex >= 1 || incident.status === IncidentStatus.REJECTED) {
        addEventAfterDelay('Threat Triaged', 'AI agent correlated events and determined priority.', <InformationCircleIcon className="w-full h-full text-sentinel-blue" />, 15);
    }
    if (currentStatusIndex >= 2 || incident.status === IncidentStatus.REJECTED) {
        addEventAfterDelay('Remediation Proposed', 'Playbook Composer generated a response plan.', <InformationCircleIcon className="w-full h-full text-sentinel-blue" />, 5);
    }
    if (currentStatusIndex >= 3) {
        addEventAfterDelay('Plan Approved & Remediating', 'Human operator approved the plan. Executing automated steps.', <CheckCircleIcon className="w-full h-full text-sentinel-green" />, 60);
        incident.remediationPlan.filter(s => s.isAutomated).forEach((step, i) => {
            addEventAfterDelay(`Action Executed`, step.description, <WrenchScrewdriverIcon className="w-full h-full text-yellow-400" />, 2 * (i + 1));
        });
    }
    if (currentStatusIndex >= 4) {
        addEventAfterDelay('Incident Resolved', 'All remediation actions completed and verified.', <CheckCircleIcon className="w-full h-full text-sentinel-green" />, 30);
    }

    if (incident.status === IncidentStatus.REJECTED) {
        addEventAfterDelay('Plan Rejected', 'Human operator rejected the proposed remediation plan.', <XCircleIcon className="w-full h-full text-red-500" />, 60);
    }

    return events.reverse();
};


const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider mb-3">{title}</h4>
        {children}
    </div>
);

const RemediationStepView: React.FC<{ step: RemediationStep }> = ({ step }) => (
    <div className="flex items-start p-3 bg-sentinel-bg-dark rounded-md">
        <div className="flex-shrink-0 mt-1" title={step.isAutomated ? 'Automated Action' : 'Manual Action Required'}>
            {step.isAutomated ? (
                <CpuChipIcon className="h-5 w-5 text-sentinel-green" />
            ) : (
                <UserIcon className="h-5 w-5 text-sentinel-text-secondary" />
            )}
        </div>
        <div className="ml-3">
            <p className="text-sm text-sentinel-text-primary">{step.description}</p>
            {step.isDestructive && <p className="text-xs text-orange-400 mt-1">Note: This is a potentially destructive action.</p>}
        </div>
    </div>
);


const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleApprove = () => {
    onUpdate({ ...incident, status: IncidentStatus.REMEDIATING });
    setIsModalOpen(false);
  };

  const handleReject = () => {
    onUpdate({ ...incident, status: IncidentStatus.REJECTED });
    setIsModalOpen(false);
  }

  const isActionable = incident.status === IncidentStatus.PENDING_APPROVAL;
  const timelineEvents = generateTimelineEvents(incident);

  return (
    <>
      <Card className="p-6">
        <div className="border-b border-sentinel-border pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-sentinel-text-primary">{incident.title}</h3>
                <p className="text-sm text-sentinel-text-secondary mt-1">{new Date(incident.timestamp).toLocaleString()}</p>
              </div>
              {isActionable && (
                 <Button onClick={() => setIsModalOpen(true)}>Review & Approve</Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                <Tag label="Priority" type="priority" value={incident.priority} />
                <Tag label="Status" type="status" value={incident.status} />
                <Tag label="Source" type="default" value={incident.source} />
            </div>
        </div>

        <p className="text-sm text-sentinel-text-secondary mb-6">{incident.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <div>
                 <DetailSection title="MITRE ATT&CK®">
                    <div className="text-sm space-y-1">
                      <p><span className="font-semibold text-sentinel-text-primary">Tactic:</span> {incident.mitreAttackTactic}</p>
                      <p><span className="font-semibold text-sentinel-text-primary">Technique:</span> {incident.mitreAttackTechnique}</p>
                    </div>
                </DetailSection>
                <DetailSection title="Affected Assets">
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {incident.affectedAssets.map(asset => <li key={asset}>{asset}</li>)}
                    </ul>
                </DetailSection>
                <DetailSection title="Evidence">
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {incident.evidence.map(item => <li key={item}>{item}</li>)}
                    </ul>
                </DetailSection>
            </div>
            <div>
                 <DetailSection title="Proposed Remediation Plan">
                    <div className="space-y-3">
                        {incident.remediationPlan.map(step => <RemediationStepView key={step.id} step={step} />)}
                    </div>
                </DetailSection>
                <DetailSection title="Action Timeline">
                     <ol className="relative border-l border-sentinel-border ml-2">                  
                        {timelineEvents.map((event, index) => (
                             <li key={index} className="mb-6 ml-6">            
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-sentinel-bg-dark rounded-full -left-3.5 ring-4 ring-sentinel-bg-light">
                                    {event.icon}
                                </span>
                                <h3 className="text-sm font-semibold text-sentinel-text-primary">{event.title}</h3>
                                <time className="block mb-1 text-xs font-normal leading-none text-sentinel-text-secondary">{event.timestamp}</time>
                                <p className="text-sm font-normal text-sentinel-text-secondary">{event.description}</p>
                            </li>
                        ))}
                    </ol>
                </DetailSection>
            </div>
        </div>

      </Card>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Approve Remediation for ${incident.id}`}
        footer={
            <>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="danger" onClick={handleReject}>Reject</Button>
                <Button variant="success" onClick={handleApprove}>Approve & Execute</Button>
            </>
        }
       >
        <p className="text-sm text-sentinel-text-secondary mb-4">You are about to approve the proposed remediation plan. Please review the actions carefully, especially those marked as destructive.</p>
        <div className="border border-sentinel-border rounded-lg p-4 bg-sentinel-bg-dark space-y-2 max-h-60 overflow-y-auto">
             {incident.remediationPlan.map(step => (
                <div key={step.id} className="text-sm">
                    <p className={step.isDestructive ? 'text-orange-400' : 'text-sentinel-text-primary'}>- {step.description}</p>
                </div>
             ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded-md text-yellow-300 text-sm">
            <strong>Auditing:</strong> This action requires two-factor authentication and will be logged permanently. By proceeding, you confirm you are authorized to perform this action.
        </div>
      </Modal>
    </>
  );
};

export default IncidentDetail;
