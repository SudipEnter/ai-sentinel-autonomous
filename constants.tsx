
import React from 'react';
import { Incident, Service, Agent, Priority, IncidentStatus } from './types';

// Icons for use in constants
const ShieldCheckIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </svg>
);
const BugAntIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
    </svg>
);
const WrenchScrewdriverIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.73-.664 1.192-.857l-2.078-2.078a3.286 3.286 0 00-4.644 0l-3.03 2.496m0 0l-1.07-1.07a3.286 3.286 0 00-4.644 0l.004.005 4.64 4.64-.005-.004a3.286 3.286 0 000-4.644l1.07-1.07m6.115 5.115l-2.496 3.03a3.286 3.286 0 01-4.644 0l-3.03-2.496a3.286 3.286 0 010-4.644l2.496-3.03m0 0v-.008c.38.245.74.545 1.054.886l2.078 2.078a3.286 3.286 0 010 4.644l-2.078 2.078a3.286 3.286 0 01-.886 1.054V15.17z" />
  </svg>
);
const ServerStackIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);
const MagnifyingGlassIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);
const BeakerIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);
const ArrowPathIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l-3.182-3.182a8.25 8.25 0 0111.664 0l3.182 3.182" />
    </svg>
);
const DocumentTextIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);
const UserGroupIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.217-1.472-2.962M7.5 14.25c-1.378.745-2.042 1.939-1.472 2.962M11.25 10.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM11.25 10.5h.008v.008h-.008V10.5z" />
    </svg>
);
const PlayIcon = ({ className = 'w-6 h-6' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
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



export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC001',
    title: 'Anomalous Sign-in Activity from Atypical Location',
    description: 'Multiple failed sign-in attempts followed by a successful login from an IP address in a non-standard geographic location for user `jane.doe@example.com`. Potential account compromise.',
    priority: Priority.HIGH,
    status: IncidentStatus.PENDING_APPROVAL,
    source: 'Entra ID',
    mitreAttackTactic: 'Initial Access',
    mitreAttackTechnique: 'T1078.004 - Valid Accounts: Cloud Accounts',
    affectedAssets: ['user:jane.doe@example.com', 'app:Office 365'],
    evidence: ['Entra ID Sign-in Logs (ID: 8a7d3c4e)', 'IP Geolocation data (RU)'],
    remediationPlan: [
      { id: 'R1-1', description: 'Force password reset for user `jane.doe@example.com`.', isDestructive: false, isAutomated: true },
      { id: 'R1-2', description: 'Revoke all active sessions for the user.', isDestructive: false, isAutomated: true },
      { id: 'R1-3', description: 'Enable risk-based MFA for the user group.', isDestructive: false, isAutomated: false },
    ],
    timestamp: '2023-10-27T10:30:00Z',
  },
  {
    id: 'INC002',
    title: 'Potential WordPress Malware Detected on Web Server',
    description: 'Microsoft Defender for Endpoint detected a suspicious PHP file (`wp-content/uploads/cache.php`) on server `WEB-PROD-01`, matching a known malware signature for a backdoor.',
    priority: Priority.CRITICAL,
    status: IncidentStatus.TRIAGED,
    source: 'Microsoft Defender',
    mitreAttackTactic: 'Persistence',
    mitreAttackTechnique: 'T1505.003 - Server Software Component: Web Shell',
    affectedAssets: ['server:WEB-PROD-01', 'site:www.example-site.com'],
    evidence: ['Defender Alert (ID: 1f2e3d4c)', 'File hash: a1b2c3d4...'],
    remediationPlan: [
      { id: 'R2-1', description: 'Quarantine the malicious file `cache.php`.', isDestructive: false, isAutomated: true },
      { id: 'R2-2', description: 'Run a full WordPress malware scan using a trusted scanner.', isDestructive: false, isAutomated: false },
      { id: 'R2-3', description: 'Guide operator to restore site from a known-good backup.', isDestructive: true, isAutomated: false },
      { id: 'R2-4', description: 'Recommend updating all WordPress plugins and themes.', isDestructive: false, isAutomated: false },
    ],
    timestamp: '2023-10-27T08:15:00Z',
  },
  {
    id: 'INC003',
    title: 'Suspicious PowerShell Execution on Server',
    description: 'Azure Sentinel correlated an event where a non-interactive process on `DC-01` spawned PowerShell and executed a base64-encoded command, indicative of lateral movement or code execution.',
    priority: Priority.HIGH,
    status: IncidentStatus.DETECTED,
    source: 'Azure Sentinel',
    mitreAttackTactic: 'Execution',
    mitreAttackTechnique: 'T1059.001 - Command and Scripting Interpreter: PowerShell',
    affectedAssets: ['server:DC-01'],
    evidence: ['Sentinel Analytics Rule Trigger (ID: 9b8c7a6b)'],
    remediationPlan: [
      { id: 'R3-1', description: 'Isolate `DC-01` from the network (except for security tools).', isDestructive: true, isAutomated: true },
      { id: 'R3-2', description: 'Collect memory dump and process logs for forensic analysis.', isDestructive: false, isAutomated: false },
      { id: 'R3-3', description: 'Block the source IP address at the firewall.', isDestructive: false, isAutomated: true },
    ],
    timestamp: '2023-10-26T22:05:00Z',
  },
   {
    id: 'INC004',
    title: 'Low-Severity Port Scan Detected',
    description: 'A low volume of TCP port scans from IP 203.0.113.15 was detected against the external firewall. No successful connections were made.',
    priority: Priority.LOW,
    status: IncidentStatus.RESOLVED,
    source: 'Azure Sentinel',
    mitreAttackTactic: 'Reconnaissance',
    mitreAttackTechnique: 'T1046 - Port Scan',
    affectedAssets: ['firewall:edge-fw-01'],
    evidence: ['Firewall logs showing multiple connection attempts to various ports.'],
    remediationPlan: [
      { id: 'R4-1', description: 'Automatically added IP to a temporary blocklist.', isDestructive: false, isAutomated: true },
      { id: 'R4-2', description: 'No further action required. The event is logged for trend analysis.', isDestructive: false, isAutomated: false },
    ],
    timestamp: '2023-10-25T14:00:00Z',
  }
];

export const SERVICES: Service[] = [
  {
    title: 'WordPress Malware Removal',
    description: 'Deep forensic analysis to precisely identify and surgically remove all malware, backdoors, and malicious code from your WordPress site, ensuring a clean and secure recovery.',
    icon: <BugAntIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Full Website Security Setup',
    description: 'A comprehensive, multi-layered security hardening service. Includes advanced firewall configuration (WAF), plugin integrity checks, and implementing security best practices to prevent future attacks.',
    icon: <ShieldCheckIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Hacked Website Recovery',
    description: 'A rapid-response, guided process to recover your website post-compromise. Involves deep-cleaning, secure restoration from backups, and a detailed post-mortem analysis to prevent re-infection.',
    icon: <ArrowPathIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Server Security & Performance Optimization',
    description: 'Holistic optimization and hardening of your server stack, including the operating system, web server (e.g., Nginx, Apache), and database configurations to maximize security and efficiency.',
    icon: <ServerStackIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Penetration Testing (Web & Network)',
    description: 'Simulate sophisticated cyber-attacks against your web applications and network infrastructure in a controlled environment to proactively identify and remediate critical vulnerabilities.',
    icon: <BeakerIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Vulnerability Assessment',
    description: 'Utilize automated, high-precision scanners to passively check your assets for thousands of known vulnerabilities (CVEs) and common configuration weaknesses without service disruption.',
    icon: <MagnifyingGlassIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Built-in DDoS Defense',
    description: 'Activate network-level DDoS mitigation to absorb and scrub malicious traffic, ensuring high availability during volumetric attacks.',
    icon: <ShieldExclamationIcon className="w-10 h-10 text-sentinel-blue" />,
  },
   {
    title: 'Mitigate OWASP Top 10 Risks',
    description: 'Deploy targeted application-layer rules to protect against the most common web vulnerabilities like Injection, XSS, and Broken Authentication.',
    icon: <CodeBracketIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Enterprise-grade Protection',
    description: 'Upgrade to a fully managed security plan with advanced threat intelligence, proactive threat hunting, and 24/7 dedicated support.',
    icon: <BuildingOfficeIcon className="w-10 h-10 text-sentinel-blue" />,
  },
  {
    title: 'Network Security Testing & Hardening',
    description: 'Perform rigorous testing of network devices, firewall rules, and segmentation. Remediate weaknesses to harden your network perimeter and internal infrastructure against unauthorized access.',
    icon: <WrenchScrewdriverIcon className="w-10 h-10 text-sentinel-blue" />,
  },
];

export const AGENTS: Agent[] = [
    { 
        name: 'Telemetry Ingestor', 
        description: 'Polls and normalizes events from Defender, Sentinel, and Entra ID.', 
        icon: <ServerStackIcon className="w-8 h-8 text-sentinel-green" />, 
        enabled: true,
        config: [
            { id: 'pollingInterval', label: 'Polling Interval', type: 'slider', value: 60, min: 10, max: 300, step: 10, unit: 's' }
        ] 
    },
    { 
        name: 'Threat Correlator', 
        description: 'Correlates events into incidents, scores risk, and maps to MITRE ATT&CK.', 
        icon: <BugAntIcon className="w-8 h-8 text-sentinel-green" />, 
        enabled: true,
        config: [
            { 
                id: 'confidenceThreshold', 
                label: 'Confidence Threshold', 
                type: 'select', 
                value: 'high',
                options: [
                    { label: 'High (>=90%)', value: 'high' },
                    { label: 'Medium (>=75%)', value: 'medium' },
                    { label: 'Low (>=50%)', value: 'low' },
                ]
            }
        ] 
    },
    { name: 'Vulnerability Assessor', description: 'Analyzes assets against known CVEs and runs passive configuration checks.', icon: <MagnifyingGlassIcon className="w-8 h-8 text-sentinel-green" />, enabled: true },
    { name: 'Response Orchestrator', description: 'Executes approved, safe remediation actions like patch orchestration.', icon: <WrenchScrewdriverIcon className="w-8 h-8 text-sentinel-green" />, enabled: true },
    { name: 'Playbook Composer', description: 'Auto-generates remediation playbooks tailored to the incident.', icon: <DocumentTextIcon className="w-8 h-8 text-sentinel-green" />, enabled: true },
    { name: 'Human Approval & Audit', description: 'Presents proposed actions, collects approvals, and maintains an audit trail.', icon: <UserGroupIcon className="w-8 h-8 text-sentinel-green" />, enabled: true },
    { name: 'Simulation & Training', description: 'Runs synthetic incidents in sandboxed labs for operator training.', icon: <PlayIcon className="w-8 h-8 text-sentinel-green" />, enabled: true },
];