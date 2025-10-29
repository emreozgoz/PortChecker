// src/lib/port/portScanner.ts

import { createConnection } from 'node:net';
import { Port, PortScanResult, PortRange } from '@/lib/types/port.types';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export class PortScanner {
  /**
   * Check if a specific port is open
   */
  async checkPort(port: number, timeout: number = 2000): Promise<PortScanResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const socket = createConnection({ port, host: 'localhost' }, () => {
        socket.destroy();
        resolve({
          port,
          isOpen: true,
          responseTime: Date.now() - startTime,
        });
      });

      socket.setTimeout(timeout);

      socket.on('error', (error) => {
        socket.destroy();
        resolve({
          port,
          isOpen: false,
          error: error.message,
        });
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve({
          port,
          isOpen: false,
          error: 'Timeout',
        });
      });
    });
  }

  /**
   * Scan a range of ports
   */
  async scanRange(range: PortRange, onProgress?: (progress: number) => void): Promise<PortScanResult[]> {
    const { start, end } = range;
    const results: PortScanResult[] = [];
    const total = end - start + 1;

    for (let port = start; port <= end; port++) {
      const result = await this.checkPort(port);
      results.push(result);

      if (onProgress) {
        const progress = ((port - start + 1) / total) * 100;
        onProgress(progress);
      }
    }

    return results;
  }

  /**
   * Scan common ports
   */
  async scanCommonPorts(): Promise<PortScanResult[]> {
    const commonPorts = [
      21, 22, 23, 25, 53, 80, 110, 143, 443,
      445, 993, 995, 3000, 3001, 3306, 5000,
      5432, 8000, 8080, 8888, 27017
    ];

    const scanPromises = commonPorts.map(port => this.checkPort(port));
    return Promise.all(scanPromises);
  }

  /**
   * Get currently listening ports
   */
  async getListeningPorts(): Promise<Port[]> {
    const platform = process.platform;

    try {
      let ports: Port[] = [];

      if (platform === 'darwin' || platform === 'linux') {
        ports = await this.getPortsUnix();
      } else if (platform === 'win32') {
        ports = await this.getPortsWindows();
      }

      return ports;
    } catch (error) {
      console.error('Error getting listening ports:', error);
      return [];
    }
  }

  private async getPortsUnix(): Promise<Port[]> {
    try {
      // lsof -iTCP -sTCP:LISTEN -P -n
      const { stdout } = await execAsync('lsof -iTCP -sTCP:LISTEN -P -n');
      return this.parseUnixOutput(stdout);
    } catch (error) {
      console.error('Error running lsof:', error);
      return [];
    }
  }

  private async getPortsWindows(): Promise<Port[]> {
    try {
      // netstat -ano | findstr LISTENING
      const { stdout } = await execAsync('netstat -ano | findstr LISTENING');
      return this.parseWindowsOutput(stdout);
    } catch (error) {
      console.error('Error running netstat:', error);
      return [];
    }
  }

  private parseUnixOutput(output: string): Port[] {
    const lines = output.split('\n').slice(1); // Skip header
    const ports: Port[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      // Example line:
      // node    12345 user   23u  IPv4 0x123abc      0t0  TCP *:3000 (LISTEN)
      const parts = line.trim().split(/\s+/);

      if (parts.length < 9) continue;

      const processName = parts[0];
      const pid = parseInt(parts[1]);
      const addressPort = parts[8];

      // Extract port from "*:3000" or "localhost:3000"
      const portMatch = addressPort.match(/:(\d+)/);
      if (!portMatch) continue;

      const port = parseInt(portMatch[1]);

      ports.push({
        port,
        status: 'listening',
        protocol: 'tcp',
        process: {
          pid,
          name: processName,
          port,
          protocol: 'tcp',
        },
        timestamp: new Date(),
      });
    }

    return ports;
  }

  private parseWindowsOutput(output: string): Port[] {
    const lines = output.split('\n');
    const ports: Port[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;

      // Example line:
      // TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345
      const parts = line.trim().split(/\s+/);

      if (parts.length < 5) continue;

      const protocol = parts[0].toLowerCase();
      const address = parts[1];
      const pid = parseInt(parts[4]);

      // Extract port from "0.0.0.0:3000"
      const portMatch = address.match(/:(\d+)$/);
      if (!portMatch) continue;

      const port = parseInt(portMatch[1]);

      ports.push({
        port,
        status: 'listening',
        protocol: protocol as 'tcp' | 'udp',
        process: {
          pid,
          name: 'Unknown', // Windows netstat doesn't show process name
          port,
          protocol: protocol as 'tcp' | 'udp',
        },
        timestamp: new Date(),
      });
    }

    return ports;
  }
}

// Export singleton instance
export const portScanner = new PortScanner();
