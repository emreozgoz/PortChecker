// src/lib/types/system.types.ts

export type Platform = 'darwin' | 'linux' | 'win32';

export interface SystemInfo {
  platform: Platform;
  arch: string;
  hostname: string;
}

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}
