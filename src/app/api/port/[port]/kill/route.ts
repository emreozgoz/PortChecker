// src/app/api/port/[port]/kill/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { processManager } from '@/lib/port/processManager';
import { portScanner } from '@/lib/port/portScanner';

export async function POST(
  request: NextRequest,
  { params }: { params: { port: string } }
) {
  try {
    const port = parseInt(params.port);
    const body = await request.json();
    const { force = false } = body;

    if (isNaN(port)) {
      return NextResponse.json(
        { success: false, error: 'Invalid port number' },
        { status: 400 }
      );
    }

    // Get listening ports to find the PID
    const ports = await portScanner.getListeningPorts();
    const targetPort = ports.find(p => p.port === port);

    if (!targetPort || !targetPort.process) {
      return NextResponse.json(
        { success: false, error: 'No process found on this port' },
        { status: 404 }
      );
    }

    // Kill the process
    const result = await processManager.killProcess(targetPort.process.pid, force);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Error killing process:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to kill process' },
      { status: 500 }
    );
  }
}
