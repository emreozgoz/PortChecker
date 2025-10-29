// src/app/api/ports/scan/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { portScanner } from '@/lib/port/portScanner';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { start, end, type } = body;

    let results;

    if (type === 'range') {
      if (!start || !end || start < 1 || end > 65535 || start > end) {
        return NextResponse.json(
          { success: false, error: 'Invalid port range' },
          { status: 400 }
        );
      }

      results = await portScanner.scanRange({ start, end });
    } else if (type === 'common') {
      results = await portScanner.scanCommonPorts();
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid scan type' },
        { status: 400 }
      );
    }

    // Filter to only open ports
    const openPorts = results.filter(r => r.isOpen);

    return NextResponse.json({
      success: true,
      data: {
        total: results.length,
        open: openPorts.length,
        closed: results.length - openPorts.length,
        ports: openPorts,
      },
    });
  } catch (error: any) {
    console.error('Error scanning ports:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to scan ports' },
      { status: 500 }
    );
  }
}
