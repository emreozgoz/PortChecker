'use client';

import { Port } from '@/lib/types/port.types';
import { PortItem } from './PortItem';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PortListProps {
  ports: Port[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function PortList({ ports, isLoading, onRefresh }: PortListProps) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <LoadingSpinner />
      </Card>
    );
  }

  if (ports.length === 0) {
    return (
      <Card className="p-8">
        <EmptyState
          title="No Active Ports"
          description="No ports are currently listening on your system"
          action={{
            label: 'Refresh',
            onClick: onRefresh,
          }}
        />
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Port</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Process</TableHead>
            <TableHead>PID</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ports.map((port) => (
            <PortItem key={port.port} port={port} onRefresh={onRefresh} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
