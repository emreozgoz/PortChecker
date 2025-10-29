'use client';

import { useState } from 'react';
import { Port } from '@/lib/types/port.types';
import { KillProcessButton } from '@/components/process/KillProcessButton';
import { PortDetails } from './PortDetails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Info } from 'lucide-react';

interface PortItemProps {
  port: Port;
  onRefresh: () => void;
}

export function PortItem({ port, onRefresh }: PortItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-mono font-semibold">{port.port}</TableCell>
        <TableCell>
          {port.service ? (
            <Badge variant="secondary">{port.service}</Badge>
          ) : (
            <span className="text-muted-foreground">Unknown</span>
          )}
        </TableCell>
        <TableCell>
          <Badge variant="outline">{port.protocol.toUpperCase()}</Badge>
        </TableCell>
        <TableCell>
          {port.process ? (
            <span className="font-mono text-sm">{port.process.name}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </TableCell>
        <TableCell>
          {port.process ? (
            <span className="font-mono text-sm">{port.process.pid}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </TableCell>
        <TableCell className="text-right space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(true)}
          >
            <Info className="w-4 h-4" />
          </Button>
          {port.process && (
            <KillProcessButton
              pid={port.process.pid}
              port={port.port}
              processName={port.process.name}
              onSuccess={onRefresh}
            />
          )}
        </TableCell>
      </TableRow>

      {showDetails && (
        <PortDetails
          port={port}
          open={showDetails}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
