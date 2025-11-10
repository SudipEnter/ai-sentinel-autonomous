
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Service, RemediationStep } from '../types';
import { SERVICES } from '../constants';
import Button from './common/Button';
import Card from './common/Card';
import Modal from './common/Modal';

// Icons
const LinkIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
);
const FolderIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013.75 3h5.25a2.25 2.25 0 012.25 2.25v.75m-9 6.75h16.5m-16.5 0a2.25 2.25 0 00-2.25 2.25v2.25A2.25 2.25 0 003.75 21h16.5a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25H3.75z" />
    </svg>
);
const DocumentArrowUpIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const SparklesIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.456-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);
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
const CheckCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const DocumentArrowDownIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);
const BeakerIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const UserGroupIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.217-1.472-2.962M7.5 14.25c-1.378.745-2.042 1.939-1.472 2.962M11.25 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM11.25 10.5h.008v.008h-.008V10.5z" />
    </svg>
);
const ShieldCheckIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);
const ShieldExclamationIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);
const CodeBracketIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
);
const BuildingOfficeIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
);
const DocumentTextIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const ExclamationTriangleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);
const InformationCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);
const XCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


type AnalysisState = 'idle' | 'analyzing' | 'complete' | 'remediating' | 'remediation_complete' | 'error';
type AnalysisTab = 'url' | 'drive' | 'file';

interface AnalysisFinding {
    severity: 'Critical' | 'High' | 'Medium' | string;
    title: string;
    description: string;
}

interface AnalysisResult {
    summary: string;
    findings: AnalysisFinding[];
    services: Service[];
    remediationPlan: RemediationStep[];
}

type LogEntryType = 'INITIALIZATION' | 'AGENT_ACTION' | 'VERIFICATION' | 'SUCCESS' | 'WARNING' | 'ERROR';

interface LogEntry {
    text: string;
    type: LogEntryType;
}

const MOCK_FINDINGS: AnalysisFinding[] = [
    { severity: 'Critical', title: 'PHP Backdoor Detected', description: 'File `wp-content/uploads/cache.php` matches signature for a known web shell.' },
    { severity: 'High', title: 'Outdated WordPress Core', description: 'Running version 5.8.1, which is vulnerable to multiple CVEs. Recommended: 6.x.' },
    { severity: 'Medium', title: 'Directory Listing Enabled', description: 'Server configuration allows browsing of directory contents, exposing sensitive file structures.' },
];

const MOCK_REMEDIATION_PLAN: RemediationStep[] = [
    { id: 'mock-1', description: 'Quarantine the malicious file `cache.php`.', isAutomated: true, isDestructive: false },
    { id: 'mock-2', description: 'Guide operator to restore site from a known-good backup.', isAutomated: false, isDestructive: true },
    { id: 'mock-3', description: 'Recommend updating all WordPress plugins and themes.', isAutomated: false, isDestructive: false },
];

const MOCK_STRUCTURED_LOG: LogEntry[] = [
    { text: "Initializing AI Sentinel Remediation Protocol...", type: 'INITIALIZATION' },
    { text: "Authenticating with secure environment...", type: 'INITIALIZATION' },
    { text: "Agent Action: Quarantining malicious file `cache.php`...", type: 'WARNING' },
    { text: "Agent Action: Applying virtual patch for WordPress Core vulnerabilities...", type: 'AGENT_ACTION' },
    { text: "Agent Action: Hardening server configuration to disable directory listing...", type: 'AGENT_ACTION' },
    { text: "Verifying remediation and running post-action scans...", type: 'VERIFICATION' },
    { text: "Finalizing audit logs...", type: 'VERIFICATION' },
    { text: "Remediation successful. All threats neutralized.", type: 'SUCCESS' }
];

// Helper to map findings to OWASP categories for the modal
const OWASP_CATEGORIES = [
    { id: 'A01', name: 'Broken Access Control', keywords: ['access', 'unauthorized', 'permission', 'idor'] },
    { id: 'A02', name: 'Cryptographic Failures', keywords: ['crypto', 'encryption', 'ssl', 'tls', 'hash'] },
    { id: 'A03', name: 'Injection', keywords: ['injection', 'sql', 'xss', 'os command'] },
    { id: 'A04', name: 'Insecure Design', keywords: ['design', 'logic flaw'] },
    { id: 'A05', name: 'Security Misconfiguration', keywords: ['config', 'default', 'headers', 'directory listing'] },
    { id: 'A06', name: 'Vulnerable & Outdated Components', keywords: ['outdated', 'vulnerable', 'cve', 'dependency'] },
    { id: 'A07', name: 'Identification & Authentication Failures', keywords: ['auth', 'login', 'session', 'mfa'] },
    { id: 'A08', name: 'Software & Data Integrity Failures', keywords: ['integrity', 'update', 'deserialization'] },
];

const LogEntryView: React.FC<{ log: LogEntry }> = ({ log }) => {
    let icon: React.ReactNode;
    let colorClass = 'text-sentinel-text-secondary';

    switch (log.type) {
        case 'INITIALIZATION':
            icon = <InformationCircleIcon className="w-4 h-4 text-sentinel-blue" />;
            colorClass = 'text-sentinel-text-secondary';
            break;
        case 'AGENT_ACTION':
            icon = <CpuChipIcon className="w-4 h-4 text-sentinel-green" />;
            colorClass = 'text-sentinel-text-primary';
            break;
        case 'VERIFICATION':
            icon = <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />;
            colorClass = 'text-sentinel-text-primary';
            break;
        case 'WARNING':
            icon = <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />;
            colorClass = 'text-yellow-400';
            break;
        case 'SUCCESS':
            icon = <CheckCircleIcon className="w-4 h-4 text-sentinel-green" />;
            colorClass = 'text-sentinel-green font-semibold';
            break;
        case 'ERROR':
            icon = <XCircleIcon className="w-4 h-4 text-red-500" />;
            colorClass = 'text-red-500';
            break;
        default:
            icon = <InformationCircleIcon className="w-4 h-4 text-sentinel-text-secondary" />;
            break;
    }
    
    return (
        <div className="flex items-start">
            <span className="mr-3 mt-0.5 flex-shrink-0">{icon}</span>
            <p className={`whitespace-pre-wrap ${colorClass}`}>{log.text}</p>
        </div>
    );
};

interface AssetAnalysisFormProps {
  initialUrl?: string;
}

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

const AssetAnalysisForm: React.FC<AssetAnalysisFormProps> = ({ initialUrl }) => {
    const [activeTab, setActiveTab] = useState<AnalysisTab>('url');
    const [url, setUrl] = useState('');
    const [driveLink, setDriveLink] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [assetIdentifier, setAssetIdentifier] = useState('');
    const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [remediationLog, setRemediationLog] = useState<LogEntry[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isGpuRemediation, setIsGpuRemediation] = useState(false);
    const [isGpuOptedIn, setIsGpuOptedIn] = useState(true); // Default to on for critical issues
    const [scheduledSteps, setScheduledSteps] = useState<string[]>([]);
    const [hasAutoAnalyzed, setHasAutoAnalyzed] = useState(false);
    
    // Custom step states
    const [isAddingCustomStep, setIsAddingCustomStep] = useState(false);
    const [newStepDescription, setNewStepDescription] = useState('');
    const [newStepIsAutomated, setNewStepIsAutomated] = useState(false);
    const [newStepIsDestructive, setNewStepIsDestructive] = useState(false);

    // Modal states
    const [isPenTestModalOpen, setIsPenTestModalOpen] = useState(false);
    const [isDdosModalOpen, setIsDdosModalOpen] = useState(false);
    const [isOwaspModalOpen, setIsOwaspModalOpen] = useState(false);
    const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

    // Modal form states
    const [ddosProtectionLevel, setDdosProtectionLevel] = useState('standard');
    const [enterprisePlan, setEnterprisePlan] = useState('business');
    const [owaspConfig, setOwaspConfig] = useState<Record<string, boolean>>({});

    const RemediationActions = [
        "Quarantined malicious file `cache.php`",
        "Applied virtual patch for WordPress Core vulnerabilities",
        "Hardened server configuration to disable directory listing",
        "Flushed permalink and object caches",
        "Finalized security audit and saved logs"
    ];

    const isInputValid = url.trim() !== '' || driveLink.trim() !== '' || file !== null;

    const useMockData = (reason: string) => {
        console.warn(reason);
        setAnalysisResult({
            summary: 'AI Sentinel has detected critical threats and multiple configuration vulnerabilities.',
            findings: MOCK_FINDINGS,
            services: [SERVICES[0], SERVICES[1], SERVICES[2]], // Include Hacked Website Recovery
            remediationPlan: MOCK_REMEDIATION_PLAN,
        });
        setAnalysisState('complete');
    }

    const handleAnalyze = async () => {
        if (!isInputValid) return;
        setAnalysisState('analyzing');
        setAnalysisResult(null);
        setError(null);
        
        const currentAssetIdentifier = activeTab === 'url' ? url : activeTab === 'drive' ? driveLink : file?.name;
        setAssetIdentifier(currentAssetIdentifier || '');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const assetType = activeTab;

            const availableServices = SERVICES.map(s => ({ title: s.title, description: s.description }));

            const prompt = `You are a multi-agent cyber defense system named "AI Sentinel". A user has submitted an asset for a deep and accurate security analysis.
            Asset type: ${assetType}
            Asset identifier: ${currentAssetIdentifier}

            Based on this information, generate a highly realistic and technical security analysis report. The report must contain:
            1. A one-sentence, impactful summary of the analysis findings.
            2. An array of exactly 3 detailed, potential findings. Each finding must have a 'severity' ('Critical', 'High', or 'Medium'), a short technical 'title', and a 'description'.
            3. An array of recommended service titles. Choose 2 to 4 of the most relevant services from the provided list based on your findings. Ensure that if the findings are severe (like backdoors, shells, or active compromises), you recommend 'Hacked Website Recovery'. If you see application layer vulnerabilities, consider 'Mitigate OWASP Top 10 Risks'.
            4. A 'remediationPlan' array of 2-3 proposed technical steps to fix the issues. Each step is an object with a 'description' (string), 'isAutomated' (boolean, true if AI can do it, false if it requires a human), and 'isDestructive' (boolean, true if it could cause data loss or downtime).

            Available Services:
            ${JSON.stringify(availableServices)}
            
            Return ONLY a valid JSON object matching the specified schema. Do not include any other text or markdown formatting.`;

            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    summary: { type: Type.STRING },
                    findings: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          severity: { type: Type.STRING },
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                        },
                        required: ['severity', 'title', 'description'],
                      },
                    },
                    recommendedServices: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    remediationPlan: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                description: { type: Type.STRING },
                                isAutomated: { type: Type.BOOLEAN },
                                isDestructive: { type: Type.BOOLEAN },
                            },
                            required: ['description', 'isAutomated', 'isDestructive'],
                        },
                    },
                  },
                  required: ['summary', 'findings', 'recommendedServices', 'remediationPlan'],
                },
              },
            });
            
            const result = JSON.parse(response.text);
            
            let recommendedServiceObjects = (result.recommendedServices || [])
                .map((title: string) => SERVICES.find(s => s.title === title))
                .filter((s): s is Service => Boolean(s));

            // Refined logic: If WordPress Malware Removal is recommended for a critical issue, escalate to Hacked Website Recovery.
            const hasWordPressMalware = recommendedServiceObjects.some(s => s.title === 'WordPress Malware Removal');
            const hasCriticalFinding = result.findings.some((f: AnalysisFinding) => f.severity === 'Critical');
            const hasHackedRecovery = recommendedServiceObjects.some(s => s.title === 'Hacked Website Recovery');

            if (hasWordPressMalware && hasCriticalFinding && !hasHackedRecovery) {
                const hackedRecoveryService = SERVICES.find(s => s.title === 'Hacked Website Recovery');
                if (hackedRecoveryService) {
                    recommendedServiceObjects.push(hackedRecoveryService);
                }
            }
            
            const planWithIds = result.remediationPlan.map((step: Omit<RemediationStep, 'id'>, index: number) => ({
                ...step,
                id: `ai-step-${index}`
            }));

            setAnalysisResult({
                summary: result.summary,
                findings: result.findings,
                services: recommendedServiceObjects.length > 0 ? recommendedServiceObjects : [SERVICES[0], SERVICES[1], SERVICES[3]],
                remediationPlan: planWithIds
            });
            setAnalysisState('complete');

        } catch (e) {
            console.error("Gemini API call failed for analysis:", e);
            setError("The AI analysis failed. Displaying mock data instead.");
            useMockData("Falling back to mock data due to API error.");
        }
    };
    
    useEffect(() => {
        if (initialUrl) {
            setActiveTab('url');
            setUrl(initialUrl);
        }
    }, [initialUrl]);

    useEffect(() => {
        // This effect runs after the state update from the previous effect.
        if (initialUrl && url === initialUrl && !hasAutoAnalyzed) {
            setHasAutoAnalyzed(true); // Prevent re-running
            handleAnalyze();
        }
    }, [initialUrl, url, hasAutoAnalyzed]);


    const handleRemediate = async () => {
        setAnalysisState('remediating');
        setRemediationLog([]);
        setError(null);
        
        const useGpu = isGpuOptedIn && analysisResult?.services.some(s => s.title === 'Hacked Website Recovery');
        setIsGpuRemediation(!!useGpu);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            let prompt = `You are the "Response Orchestrator Agent" for a system named "AI Sentinel". You are tasked with remediating security threats based on a provided plan.
            The following security findings were identified:
            ${JSON.stringify(analysisResult?.findings)}

            The approved remediation plan is:
            ${JSON.stringify(analysisResult?.remediationPlan)}
            `;

            if (useGpu) {
                prompt += `\n\nThis is a high-stakes "Hacked Website Recovery" scenario. The remediation will be accelerated using NVIDIA L4 GPUs on Cloud Run. Generate a log that reflects this advanced capability. The log must be based on the provided remediation plan, but should be expanded to include steps like large-scale forensic data analysis, accelerated malware signature matching, neural network-based anomaly detection, and secure environment reconstruction. The tone should be highly technical and convey a sense of power and speed.`;
            } else {
                prompt += `\n\nGenerate a realistic, step-by-step log of an automated AI agent executing the provided remediation plan to fix these issues. The log should be technical and sound convincing.`;
            }

            prompt += `\n\nThe log should have between 8 and 10 steps. Each log entry must be an object with two properties:
            1. "text": A string describing the log entry.
            2. "type": A string representing the type of log entry. Possible values are: 'INITIALIZATION', 'AGENT_ACTION', 'VERIFICATION', 'SUCCESS', 'WARNING', 'ERROR'.
            - Use 'INITIALIZATION' for starting or authenticating steps.
            - Use 'AGENT_ACTION' for a standard, non-destructive, automated action.
            - Use 'VERIFICATION' for scanning or checking steps.
            - Use 'SUCCESS' for the final completion message.
            - Use 'WARNING' for potentially destructive or risky AGENT ACTIONS. If an agent action is destructive, its type should be 'WARNING' and its text should still describe the action (e.g., "Agent Action: Deleting compromised file..."). Also use 'WARNING' for standalone cautionary messages.
            - Use 'ERROR' for any failures.

            Return ONLY a valid JSON object with a single key 'log', which is an array of these log entry objects. Do not include any other text or markdown formatting.`;
            
            const response = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: prompt,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    log: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          text: { type: Type.STRING },
                          type: { type: Type.STRING },
                        },
                        required: ['text', 'type'],
                      },
                    },
                  },
                  required: ['log'],
                },
              },
            });
            
            const result = JSON.parse(response.text);
            const steps: LogEntry[] = result.log || MOCK_STRUCTURED_LOG;
            
            steps.forEach((step, index) => {
                setTimeout(() => {
                    setRemediationLog(prev => [...prev, step]);
                }, 800 * (index + 1));
            });

            setTimeout(() => {
                setAnalysisState('remediation_complete');
            }, 800 * (steps.length + 1));
        } catch (e) {
            console.error("Gemini API call failed for remediation:", e);
            setError("The AI remediation failed. Using mock remediation log.");
            MOCK_STRUCTURED_LOG.forEach((step, index) => {
                setTimeout(() => {
                    setRemediationLog(prev => [...prev, step]);
                }, 800 * (index + 1));
            });
            setTimeout(() => {
                setAnalysisState('remediation_complete');
            }, 800 * (MOCK_STRUCTURED_LOG.length + 1));
        }
    };
    
    const handleSaveCustomStep = () => {
        if (!newStepDescription.trim() || !analysisResult) return;
        
        const newStep: RemediationStep = {
            id: `custom-${Date.now()}`,
            description: newStepDescription,
            isAutomated: newStepIsAutomated,
            isDestructive: newStepIsDestructive,
        };

        setAnalysisResult(prevResult => ({
            ...prevResult!,
            remediationPlan: [...prevResult!.remediationPlan, newStep],
        }));

        // Reset form
        setIsAddingCustomStep(false);
        setNewStepDescription('');
        setNewStepIsAutomated(false);
        setNewStepIsDestructive(false);
    };

    const handleScheduleStep = (stepTitle: string) => {
        if (stepTitle === 'Schedule Pen-Test') {
            setIsPenTestModalOpen(true);
        } else if (stepTitle === 'Enable DDoS Protection') {
            setIsDdosModalOpen(true);
        } else if (stepTitle === 'Mitigate OWASP Risks') {
            // Pre-configure OWASP modal based on findings
            const newOwaspConfig: Record<string, boolean> = {};
            const findingsText = JSON.stringify(analysisResult?.findings || []).toLowerCase();
            OWASP_CATEGORIES.forEach(cat => {
                if (cat.keywords.some(kw => findingsText.includes(kw))) {
                    newOwaspConfig[cat.id] = true;
                }
            });
            setOwaspConfig(newOwaspConfig);
            setIsOwaspModalOpen(true);
        } else if (stepTitle === 'Enable Enterprise Protection') {
            setIsEnterpriseModalOpen(true);
        } else {
            setScheduledSteps(prev => [...prev, stepTitle]);
        }
    };

    const handleConfirmPenTest = () => {
        setScheduledSteps(prev => [...prev, 'Schedule Pen-Test']);
        setIsPenTestModalOpen(false);
    };

    const handleConfirmDdos = () => {
        setScheduledSteps(prev => [...prev, 'Enable DDoS Protection']);
        setIsDdosModalOpen(false);
    };
    
    const handleConfirmOwasp = () => {
        setScheduledSteps(prev => [...prev, 'Mitigate OWASP Risks']);
        setIsOwaspModalOpen(false);
    };

    const handleConfirmEnterprise = () => {
        setScheduledSteps(prev => [...prev, 'Enable Enterprise Protection']);
        setIsEnterpriseModalOpen(false);
    };

    const handleReset = () => {
        setAnalysisState('idle');
        setAnalysisResult(null);
        setUrl('');
        setDriveLink('');
        setFile(null);
        setAssetIdentifier('');
        setRemediationLog([]);
        setError(null);
        setIsGpuRemediation(false);
        setIsGpuOptedIn(true);
        setScheduledSteps([]);
        setIsPenTestModalOpen(false);
        setIsDdosModalOpen(false);
        setIsOwaspModalOpen(false);
        setIsEnterpriseModalOpen(false);
        setHasAutoAnalyzed(false);
        setIsAddingCustomStep(false);
    }
    
    const renderInput = () => {
        switch (activeTab) {
            case 'url':
                return (
                    <div>
                        <label htmlFor="url-input" className="sr-only">Website URL</label>
                        <input
                            type="url"
                            id="url-input"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue sm:text-sm p-3"
                            placeholder="https://example.com"
                        />
                    </div>
                );
            case 'drive':
                return (
                     <div>
                        <label htmlFor="drive-input" className="sr-only">Google Drive Link</label>
                        <input
                            type="url"
                            id="drive-input"
                            value={driveLink}
                            onChange={(e) => setDriveLink(e.target.value)}
                            className="block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue sm:text-sm p-3"
                            placeholder="https://drive.google.com/drive/folders/..."
                        />
                        <p className="mt-2 text-xs text-sentinel-text-secondary">Please ensure the folder is shared with "anyone with the link".</p>
                    </div>
                );
            case 'file':
                return (
                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sentinel-border border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <DocumentArrowUpIcon className="mx-auto h-12 w-12 text-sentinel-text-secondary" />
                            <div className="flex text-sm text-sentinel-text-secondary">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-sentinel-bg-dark rounded-md font-medium text-sentinel-blue hover:text-blue-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-sentinel-bg-light focus-within:ring-blue-500">
                                    <span>{file ? 'Replace file' : 'Upload a file'}</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-sentinel-text-secondary">{file ? file.name : 'ZIP, RAR, SQL up to 500MB'}</p>
                        </div>
                    </div>
                );
        }
    };
    
    const TabButton: React.FC<{ tab: AnalysisTab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-md border-b-2 transition-colors duration-200 focus:outline-none ${
                activeTab === tab 
                ? 'border-sentinel-blue text-sentinel-blue' 
                : 'border-transparent text-sentinel-text-secondary hover:border-sentinel-border hover:text-sentinel-text-primary'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    const severityColor = {
        Critical: 'border-red-500/50 bg-red-900/20 text-red-400',
        High: 'border-orange-500/50 bg-orange-900/20 text-orange-400',
        Medium: 'border-yellow-500/50 bg-yellow-900/20 text-yellow-400',
    }
    
    const showGpuToggle = analysisResult?.services.some(s => s.title === 'Hacked Website Recovery');
    
    // Dynamically build next steps based on recommended services
    const getNextSteps = () => {
        const steps = [
            { title: "Review User Access", description: "Audit IAM roles and permissions for least-privilege access.", icon: <UserGroupIcon className="w-8 h-8 text-sentinel-blue" /> },
            { title: "Schedule Pen-Test", description: "Engage a red team to validate the implemented defenses.", icon: <BeakerIcon className="w-8 h-8 text-sentinel-blue" /> },
            { title: "Enable Continuous Monitoring", description: "Configure ongoing threat detection for this asset.", icon: <ShieldCheckIcon className="w-8 h-8 text-sentinel-blue" /> }
        ];

        if (analysisResult?.services.some(s => s.title === 'Hacked Website Recovery')) {
            // Add post-mortem analysis as a primary next step for severe incidents.
            steps.unshift({ title: "Initiate Post-Mortem Analysis", description: "Schedule a review of the incident, response, and lessons learned.", icon: <DocumentTextIcon className="w-8 h-8 text-sentinel-blue" /> });
        }

        if (analysisResult?.services.some(s => s.title === 'Built-in DDoS Defense')) {
            steps.push({ title: "Enable DDoS Protection", description: "Activate network-level absorption and traffic scrubbing.", icon: <ShieldExclamationIcon className="w-8 h-8 text-sentinel-blue" /> });
        }
        if (analysisResult?.services.some(s => s.title === 'Mitigate OWASP Top 10 Risks')) {
            steps.push({ title: "Mitigate OWASP Risks", description: "Deploy targeted rules to protect against common web vulnerabilities.", icon: <CodeBracketIcon className="w-8 h-8 text-sentinel-blue" /> });
        }
        if (analysisResult?.services.some(s => s.title === 'Enterprise-grade Protection')) {
            steps.push({ title: "Enable Enterprise Protection", description: "Upgrade to a managed plan with 24/7 support and threat hunting.", icon: <BuildingOfficeIcon className="w-8 h-8 text-sentinel-blue" /> });
        }
        return steps;
    };
    
    const nextSteps = analysisState === 'remediation_complete' ? getNextSteps() : [];


    return (
        <Card>
            {analysisState === 'idle' && (
                 <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-sentinel-text-primary">Analyze Your Assets</h3>
                    <p className="mt-2 text-sm text-sentinel-text-secondary">Submit a website, folder, or file for deep analysis. Our AI will identify threats and recommend the necessary security services.</p>
                    <div className="mt-6">
                        <div className="border-b border-sentinel-border">
                            <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                               <TabButton tab="url" label="Website URL" icon={<LinkIcon />} />
                               <TabButton tab="drive" label="Drive Folder" icon={<FolderIcon />} />
                               <TabButton tab="file" label="File Upload" icon={<DocumentArrowUpIcon />} />
                            </nav>
                        </div>
                        <div className="mt-4">
                            {renderInput()}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleAnalyze}
                            disabled={!isInputValid}
                            leftIcon={<SparklesIcon />}
                        >
                            Analyze Asset
                        </Button>
                    </div>
                 </div>
            )}

            {analysisState === 'analyzing' && (
                <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-sentinel-blue border-t-transparent rounded-full animate-spin"></div>
                    <h3 className="mt-4 text-lg font-semibold text-sentinel-text-primary">AI Analysis in Progress...</h3>
                    <p className="mt-2 text-sm text-sentinel-text-secondary">Sentinel agents are performing a deep scan of your asset for vulnerabilities, malware, and misconfigurations. This may take a moment.</p>
                </div>
            )}
            
            {analysisState === 'complete' && analysisResult && (
                 <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold text-sentinel-green flex items-center"><SparklesIcon className="mr-2" /> Analysis Complete</h3>
                    <p className="mt-2 text-sm text-sentinel-text-secondary">{analysisResult.summary}</p>
                    {error && <p className="mt-2 text-sm text-yellow-400 bg-yellow-900/50 p-2 rounded-md">{error}</p>}

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="md:col-span-2 space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider mb-3">Key Findings</h4>
                                <div className="space-y-3">
                                    {analysisResult.findings.map(finding => (
                                        <div key={finding.title} className={`p-3 border rounded-md ${severityColor[finding.severity] || severityColor.Medium}`}>
                                            <div className="flex items-center justify-between">
                                                <h5 className="font-semibold text-sm">{finding.title}</h5>
                                                <span className="text-xs font-bold">{finding.severity}</span>
                                            </div>
                                            <p className="text-xs text-sentinel-text-secondary mt-1">{finding.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider mb-3">Proposed Remediation Plan</h4>
                                <div className="space-y-3">
                                    {analysisResult.remediationPlan.map(step => <RemediationStepView key={step.id} step={step} />)}
                                </div>
                                {isAddingCustomStep ? (
                                    <div className="mt-4 p-4 border border-sentinel-border rounded-lg bg-sentinel-bg-dark space-y-3">
                                        <textarea 
                                            value={newStepDescription}
                                            onChange={(e) => setNewStepDescription(e.target.value)}
                                            placeholder="Enter custom step description..."
                                            className="block w-full text-sm rounded-md bg-sentinel-bg-light border-sentinel-border shadow-sm focus:border-sentinel-blue focus:ring-sentinel-blue p-2"
                                            rows={2}
                                        />
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center">
                                                <input type="checkbox" id="isAutomated" checked={newStepIsAutomated} onChange={(e) => setNewStepIsAutomated(e.target.checked)} className="h-4 w-4 rounded border-sentinel-border bg-sentinel-bg-light text-sentinel-blue focus:ring-sentinel-blue" />
                                                <label htmlFor="isAutomated" className="ml-2 text-sm text-sentinel-text-secondary">Automated</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="checkbox" id="isDestructive" checked={newStepIsDestructive} onChange={(e) => setNewStepIsDestructive(e.target.checked)} className="h-4 w-4 rounded border-sentinel-border bg-sentinel-bg-light text-sentinel-blue focus:ring-sentinel-blue" />
                                                <label htmlFor="isDestructive" className="ml-2 text-sm text-sentinel-text-secondary">Destructive</label>
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="secondary" onClick={() => setIsAddingCustomStep(false)}>Cancel</Button>
                                            <Button onClick={handleSaveCustomStep} disabled={!newStepDescription.trim()}>Save Step</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-4">
                                        <Button variant="secondary" onClick={() => setIsAddingCustomStep(true)}>Add Custom Step</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider mb-3">Recommended Services</h4>
                            <div className="space-y-3">
                                {analysisResult.services.map(service => (
                                    <Card key={service.title} className="p-3 bg-sentinel-bg-dark flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            {React.cloneElement(service.icon as React.ReactElement, { className: 'w-6 h-6 text-sentinel-blue' })}
                                        </div>
                                        <div>
                                            <h5 className="font-semibold text-sentinel-text-primary text-sm">{service.title}</h5>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {showGpuToggle && (
                        <div className="mt-6 bg-sentinel-bg-dark p-4 rounded-lg border border-sentinel-border">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="gpu-toggle" className="font-semibold text-sentinel-text-primary">Enable GPU-Accelerated Remediation</label>
                                    <p className="text-sm text-sentinel-text-secondary">Utilizes NVIDIA L4 GPUs for deeper forensics and faster recovery. Recommended for critical incidents.</p>
                                </div>
                                <button
                                    type="button"
                                    className={`${isGpuOptedIn ? 'bg-sentinel-green' : 'bg-sentinel-border'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sentinel-blue focus:ring-offset-2 focus:ring-offset-sentinel-bg-dark`}
                                    role="switch"
                                    aria-checked={isGpuOptedIn}
                                    onClick={() => setIsGpuOptedIn(!isGpuOptedIn)}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`${isGpuOptedIn ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                                    />
                                </button>
                            </div>
                        </div>
                    )}

                    {showGpuToggle && isGpuOptedIn && (
                        <div className="mt-4 p-3 bg-orange-900/50 border border-orange-700 rounded-md text-orange-300 text-sm flex items-start">
                            <ExclamationTriangleIcon className="w-8 h-8 text-orange-400 flex-shrink-0" />
                            <div className="ml-3">
                                <h4 className="font-semibold">Advanced Protocol Engaged</h4>
                                <p>GPU-accelerated remediation performs deep system-level analysis and modifications. This powerful process is irreversible and intended for critical threat neutralization.</p>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-sentinel-border flex items-center justify-between">
                        <Button variant="secondary" onClick={handleReset}>
                            Analyze Another Asset
                        </Button>
                        <Button variant="success" onClick={handleRemediate}>
                            Proceed with AI Remediation
                        </Button>
                    </div>
                 </div>
            )}

             {analysisState === 'remediating' && (
                <div className="p-6 md:p-8">
                    {isGpuRemediation ? (
                        <>
                            <div className="flex items-center mb-4">
                                <CpuChipIcon className="w-6 h-6 text-sentinel-green mr-3 animate-pulse" />
                                <h3 className="text-xl font-bold text-sentinel-text-primary">Engaging GPU-Accelerated Remediation</h3>
                            </div>
                            <p className="text-sm text-sentinel-text-secondary mb-4">
                                High-threat scenario detected. Harnessing the power of <span className="text-sentinel-green font-semibold">NVIDIA L4 GPUs on Cloud Run</span> to accelerate forensic analysis and malware neutralization. This advanced process allows for deep state analysis and rapid recovery.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center mb-4">
                                <CpuChipIcon className="w-6 h-6 text-sentinel-green mr-3 animate-pulse" />
                                <h3 className="text-xl font-bold text-sentinel-text-primary">Initiating AI-Powered Remediation</h3>
                            </div>
                            <p className="text-sm text-sentinel-text-secondary mb-4">Response Orchestrator Agent is executing the remediation plan using a secure, automated environment.</p>
                        </>
                    )}
                    {error && <p className="mb-2 text-sm text-yellow-400 bg-yellow-900/50 p-2 rounded-md">{error}</p>}
                    <div className="bg-sentinel-bg-dark p-4 rounded-lg font-mono text-xs h-64 overflow-y-auto space-y-2">
                        {remediationLog.map((log, index) => (
                           <LogEntryView key={index} log={log} />
                        ))}
                         <div className="w-2 h-4 bg-sentinel-green animate-pulse mt-1"></div>
                    </div>
                </div>
            )}

            {analysisState === 'remediation_complete' && (
                <div className="p-6 md:p-8 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-sentinel-green mx-auto" />
                    <h3 className="mt-4 text-2xl font-bold text-sentinel-text-primary">Remediation Successful</h3>
                    <p className="mt-2 max-w-2xl mx-auto text-sm text-sentinel-text-secondary">
                        AI Sentinel has successfully neutralized all identified threats and hardened your asset's defenses. A detailed report of all actions has been generated for your records.
                    </p>

                    <div className="mt-8 text-left grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-sentinel-bg-dark p-6 rounded-lg border border-sentinel-border">
                            <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider mb-4">Remediation Summary</h4>
                            <ul className="space-y-3">
                                {(remediationLog.filter(l => l.type === 'AGENT_ACTION' || l.type === 'WARNING') || RemediationActions).map((action, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircleIcon className="w-5 h-5 text-sentinel-green flex-shrink-0 mt-0.5 mr-3" />
                                        <span className={`text-sm ${action.type === 'WARNING' ? 'text-yellow-400' : 'text-sentinel-text-primary'}`}>{action.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-sentinel-text-secondary uppercase tracking-wider">Recommended Next Steps</h4>
                            {nextSteps.map((step, index) => {
                                const isScheduled = scheduledSteps.includes(step.title);
                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => !isScheduled && handleScheduleStep(step.title)}
                                        className={`relative border border-sentinel-border rounded-lg p-4 bg-sentinel-bg-dark flex items-start space-x-4 transition-all duration-200 ${isScheduled ? 'bg-sentinel-border border-sentinel-green/50' : 'cursor-pointer hover:border-sentinel-blue'}`}
                                    >
                                        <div className="flex-shrink-0 bg-sentinel-bg-light p-3 rounded-lg">
                                            {step.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <h5 className="font-semibold text-sentinel-text-primary">{step.title}</h5>
                                            <p className="text-sm text-sentinel-text-secondary">{step.description}</p>
                                        </div>
                                        {isScheduled && (
                                            <div className="absolute top-4 right-4 flex items-center text-sentinel-green">
                                                <CheckCircleIcon className="w-5 h-5 mr-2" />
                                                <span className="text-sm font-semibold">Scheduled</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="secondary" onClick={handleReset}>
                            Analyze Another Asset
                        </Button>
                        <Button variant="primary" leftIcon={<DocumentArrowDownIcon />}>
                            Download Remediation Report (PDF)
                        </Button>
                    </div>
                </div>
            )}

            <Modal 
                isOpen={isPenTestModalOpen}
                onClose={() => setIsPenTestModalOpen(false)}
                title="Schedule Penetration Test"
                size="2xl"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsPenTestModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleConfirmPenTest}>Confirm Schedule</Button>
                    </>
                }
            >
                <p className="text-sm text-sentinel-text-secondary mb-4">A penetration test will be scheduled based on the recent analysis findings to validate the effectiveness of the remediation.</p>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-sentinel-text-secondary">Test Scope</label>
                        <input type="text" readOnly value={assetIdentifier} className="mt-1 block w-full rounded-md bg-sentinel-bg-dark border-sentinel-border shadow-sm sm:text-sm text-sentinel-text-secondary p-2" />
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-sentinel-text-secondary">Primary Focus Areas (from findings)</label>
                         <ul className="list-disc list-inside mt-2 text-sm text-sentinel-text-primary bg-sentinel-bg-dark p-3 rounded-md border border-sentinel-border space-y-1">
                            {analysisResult?.findings.map(f => <li key={f.title}>{f.title}</li>)}
                         </ul>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={isDdosModalOpen}
                onClose={() => setIsDdosModalOpen(false)}
                title="Configure DDoS Protection"
                size="2xl"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsDdosModalOpen(false)}>Cancel</Button>
                        <Button variant="success" onClick={handleConfirmDdos}>Activate Protection</Button>
                    </>
                }
            >
                <p className="text-sm text-sentinel-text-secondary mb-4">Activate network-level protection to mitigate Distributed Denial of Service (DDoS) attacks and ensure service availability.</p>
                 <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-sentinel-text-secondary">Protection Level</legend>
                    <div className="relative flex items-start p-3 rounded-md border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:bg-sentinel-blue/10">
                        <div className="flex h-5 items-center">
                            <input id="ddos-standard" name="ddos-level" type="radio" value="standard" checked={ddosProtectionLevel === 'standard'} onChange={(e) => setDdosProtectionLevel(e.target.value)} className="h-4 w-4 border-sentinel-border bg-sentinel-bg-dark text-sentinel-blue focus:ring-sentinel-blue" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="ddos-standard" className="font-medium text-sentinel-text-primary">Standard</label>
                            <p className="text-sentinel-text-secondary">Protection against common network and transport layer attacks (e.g., SYN floods).</p>
                        </div>
                    </div>
                    <div className="relative flex items-start p-3 rounded-md border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:bg-sentinel-blue/10">
                        <div className="flex h-5 items-center">
                            <input id="ddos-advanced" name="ddos-level" type="radio" value="advanced" checked={ddosProtectionLevel === 'advanced'} onChange={(e) => setDdosProtectionLevel(e.target.value)} className="h-4 w-4 border-sentinel-border bg-sentinel-bg-dark text-sentinel-blue focus:ring-sentinel-blue" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="ddos-advanced" className="font-medium text-sentinel-text-primary">Advanced</label>
                            <p className="text-sentinel-text-secondary">Includes Standard protection plus application layer (L7) mitigation and proactive threat intelligence.</p>
                        </div>
                    </div>
                </fieldset>
            </Modal>
            
            <Modal
                isOpen={isOwaspModalOpen}
                onClose={() => setIsOwaspModalOpen(false)}
                title="Configure OWASP Mitigation"
                size="3xl"
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsOwaspModalOpen(false)}>Cancel</Button>
                        <Button variant="success" onClick={handleConfirmOwasp}>Apply Protections</Button>
                    </>
                }
            >
                 <p className="text-sm text-sentinel-text-secondary mb-4">Enable specific application-layer protections based on the OWASP Top 10. The system has pre-selected rules based on the analysis findings.</p>
                 <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <legend className="sr-only">OWASP Categories</legend>
                    {OWASP_CATEGORIES.map(category => (
                         <div key={category.id} className="relative flex items-start p-3 rounded-md border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:bg-sentinel-blue/10">
                            <div className="flex h-5 items-center">
                                <input 
                                    id={category.id} 
                                    name={category.id} 
                                    type="checkbox" 
                                    checked={owaspConfig[category.id] || false}
                                    onChange={(e) => setOwaspConfig(prev => ({...prev, [category.id]: e.target.checked}))}
                                    className="h-4 w-4 border-sentinel-border bg-sentinel-bg-dark text-sentinel-blue focus:ring-sentinel-blue" 
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor={category.id} className="font-medium text-sentinel-text-primary">{category.name}</label>
                            </div>
                        </div>
                    ))}
                 </fieldset>
            </Modal>
            
            <Modal
                 isOpen={isEnterpriseModalOpen}
                 onClose={() => setIsEnterpriseModalOpen(false)}
                 title="Upgrade to Enterprise-grade Protection"
                 size="3xl"
                 footer={
                     <>
                         <Button variant="secondary" onClick={() => setIsEnterpriseModalOpen(false)}>Cancel</Button>
                         <Button variant="primary" onClick={handleConfirmEnterprise}>Confirm Plan</Button>
                     </>
                 }
            >
                <p className="text-sm text-sentinel-text-secondary mb-4">Select a managed security plan to get advanced protection, proactive threat hunting, and dedicated 24/7 support from our security experts.</p>
                 <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <legend className="sr-only">Enterprise Plans</legend>
                    
                    <label htmlFor="plan-business" className="relative block p-4 rounded-lg border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:ring-2 has-[:checked]:ring-sentinel-blue cursor-pointer">
                        <input type="radio" name="enterprise-plan" id="plan-business" value="business" checked={enterprisePlan === 'business'} onChange={e => setEnterprisePlan(e.target.value)} className="sr-only" />
                        <div className="text-lg font-semibold text-sentinel-text-primary">Business</div>
                        <p className="text-sm text-sentinel-text-secondary mt-1">24/7 monitoring, advanced WAF, and threat intelligence feeds.</p>
                    </label>

                    <label htmlFor="plan-enterprise" className="relative block p-4 rounded-lg border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:ring-2 has-[:checked]:ring-sentinel-blue cursor-pointer">
                        <input type="radio" name="enterprise-plan" id="plan-enterprise" value="enterprise" checked={enterprisePlan === 'enterprise'} onChange={e => setEnterprisePlan(e.target.value)} className="sr-only" />
                        <div className="text-lg font-semibold text-sentinel-text-primary">Enterprise</div>
                        <p className="text-sm text-sentinel-text-secondary mt-1">Includes Business, plus proactive threat hunting and a dedicated security analyst.</p>
                    </label>

                     <label htmlFor="plan-elite" className="relative block p-4 rounded-lg border border-sentinel-border has-[:checked]:border-sentinel-blue has-[:checked]:ring-2 has-[:checked]:ring-sentinel-blue cursor-pointer">
                        <input type="radio" name="enterprise-plan" id="plan-elite" value="elite" checked={enterprisePlan === 'elite'} onChange={e => setEnterprisePlan(e.target.value)} className="sr-only" />
                        <div className="text-lg font-semibold text-sentinel-text-primary">Elite</div>
                        <p className="text-sm text-sentinel-text-secondary mt-1">Full-spectrum coverage with red-teaming, breach simulations, and a dedicated response team.</p>
                    </label>
                 </fieldset>
            </Modal>

        </Card>
    );
};

export default AssetAnalysisForm;
