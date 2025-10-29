// src/lib/port/processManager.ts

import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { ProcessInfo, KillProcessResult } from '@/lib/types/process.types';

const execAsync = promisify(exec);

export class ProcessManager {
  /**
   * Get process information by PID
   */
  async getProcessInfo(pid: number): Promise<ProcessInfo | null> {
    const platform = process.platform;

    try {
      if (platform === 'darwin' || platform === 'linux') {
        return await this.getProcessInfoUnix(pid);
      } else if (platform === 'win32') {
        return await this.getProcessInfoWindows(pid);
      }
      return null;
    } catch (error) {
      console.error('Error getting process info:', error);
      return null;
    }
  }

  private async getProcessInfoUnix(pid: number): Promise<ProcessInfo | null> {
    try {
      // ps -p PID -o pid,comm,command
      const { stdout } = await execAsync(`ps -p ${pid} -o pid,comm,command`);
      const lines = stdout.split('\n');

      if (lines.length < 2) return null;

      const parts = lines[1].trim().split(/\s+/);
      const processName = parts[1];
      const command = parts.slice(2).join(' ');

      return {
        pid,
        name: processName,
        command,
        port: 0, // Will be filled by caller
        protocol: 'tcp',
      };
    } catch (error) {
      return null;
    }
  }

  private async getProcessInfoWindows(pid: number): Promise<ProcessInfo | null> {
    try {
      // tasklist /FI "PID eq PID" /FO CSV
      const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}" /FO CSV`);
      const lines = stdout.split('\n');

      if (lines.length < 2) return null;

      // Parse CSV output
      const values = lines[1].split(',').map(v => v.replace(/"/g, ''));
      const processName = values[0];

      return {
        pid,
        name: processName,
        port: 0, // Will be filled by caller
        protocol: 'tcp',
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Kill a process by PID
   */
  async killProcess(pid: number, force: boolean = false): Promise<KillProcessResult> {
    const platform = process.platform;

    try {
      if (platform === 'darwin' || platform === 'linux') {
        return await this.killProcessUnix(pid, force);
      } else if (platform === 'win32') {
        return await this.killProcessWindows(pid, force);
      }

      return {
        success: false,
        message: 'Unsupported platform',
        pid,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to kill process',
        pid,
      };
    }
  }

  private async killProcessUnix(pid: number, force: boolean): Promise<KillProcessResult> {
    try {
      const signal = force ? '9' : '15'; // SIGKILL=9, SIGTERM=15
      await execAsync(`kill -${signal} ${pid}`);

      return {
        success: true,
        message: `Process ${pid} killed successfully`,
        pid,
      };
    } catch (error: any) {
      // Check if process doesn't exist
      if (error.message.includes('No such process')) {
        return {
          success: false,
          message: 'Process not found',
          pid,
        };
      }

      throw error;
    }
  }

  private async killProcessWindows(pid: number, force: boolean): Promise<KillProcessResult> {
    try {
      const flag = force ? '/F' : '';
      await execAsync(`taskkill /PID ${pid} ${flag}`);

      return {
        success: true,
        message: `Process ${pid} killed successfully`,
        pid,
      };
    } catch (error: any) {
      if (error.message.includes('not found')) {
        return {
          success: false,
          message: 'Process not found',
          pid,
        };
      }

      throw error;
    }
  }

  /**
   * Check if process is still running
   */
  async isProcessRunning(pid: number): Promise<boolean> {
    const platform = process.platform;

    try {
      if (platform === 'darwin' || platform === 'linux') {
        await execAsync(`ps -p ${pid}`);
        return true;
      } else if (platform === 'win32') {
        const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}"`);
        return stdout.includes(pid.toString());
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const processManager = new ProcessManager();
