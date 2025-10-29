// src/lib/types/process.types.ts

export interface ProcessInfo {
  pid: number;
  name: string;
  command?: string;
  port: number;
  protocol: 'tcp' | 'udp';
  state?: string;
  user?: string;
}

export interface KillProcessResult {
  success: boolean;
  message: string;
  pid: number;
}

export interface ProcessListItem {
  pid: number;
  name: string;
  ports: number[];
  cpu?: number;
  memory?: number;
}
