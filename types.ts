// Fix: Import `ReactNode` to provide a type for React components.
import type { ReactNode } from 'react';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export enum IncidentStatus {
  DETECTED = 'Detected',
  TRIAGED = 'Triaged',
  PENDING_APPROVAL = 'Pending Approval',
  REMEDIATING = 'Remediating',
  RESOLVED = 'Resolved',
  REJECTED = 'Rejected',
}

export interface RemediationStep {
  id: string;
  description: string;
  isDestructive: boolean;
  isAutomated: boolean;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: IncidentStatus;
  source: 'Microsoft Defender' | 'Azure Sentinel' | 'Entra ID';
  mitreAttackTactic: string;
  mitreAttackTechnique: string;
  affectedAssets: string[];
  evidence: string[];
  remediationPlan: RemediationStep[];
  timestamp: string;
}

export interface Service {
  title: string;
  description: string;
  // Fix: Use `ReactNode` instead of `JSX.Element` to avoid JSX namespace error.
  icon: ReactNode;
}

export interface AgentConfig {
  id: string;
  label: string;
  type: 'slider' | 'select';
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  unit?: string;
}

export interface Agent {
  name: string;
  description: string;
  // Fix: Use `ReactNode` instead of `JSX.Element` to avoid JSX namespace error.
  icon: ReactNode;
  enabled: boolean;
  config?: AgentConfig[];
}