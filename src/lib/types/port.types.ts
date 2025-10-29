// src/lib/types/port.types.ts

import { ProcessInfo } from './process.types';

export interface Port {
  port: number;
  status: 'open' | 'closed' | 'listening';
  protocol: 'tcp' | 'udp';
  process?: ProcessInfo;
  service?: string; // HTTP, HTTPS, MySQL, etc.
  timestamp: Date;
}

export interface PortScanResult {
  port: number;
  isOpen: boolean;
  responseTime?: number;
  error?: string;
}

export interface PortRange {
  start: number;
  end: number;
}

export interface CommonPort {
  port: number;
  service: string;
  protocol: 'tcp' | 'udp';
  description: string;
  category: 'web' | 'database' | 'development' | 'email' | 'other';
}

export type PortStatus = 'scanning' | 'idle' | 'error';
