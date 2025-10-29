// src/app/api/ports/route.ts

import { NextResponse } from 'next/server';
import { portScanner } from '@/lib/port/portScanner';
import { getPortInfo } from '@/lib/data/commonPorts';

export async function GET() {
  try {
    const ports = await portScanner.getListeningPorts();

    // Enrich with common port info
    const enrichedPorts = ports.map(port => ({
      ...port,
      service: getPortInfo(port.port)?.service,
    }));

    return NextResponse.json({
      success: true,
      data: enrichedPorts,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error getting ports:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get ports'
      },
      { status: 500 }
    );
  }
}
