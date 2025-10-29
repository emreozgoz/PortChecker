'use client';

import { Port } from '@/lib/types/port.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface PortDetailsProps {
  port: Port;
  open: boolean;
  onClose: () => void;
}

export function PortDetails({ port, open, onClose }: PortDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Port {port.port} Details</DialogTitle>
          <DialogDescription>
            Detailed information about this port
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-2">Port Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Port Number:</span>
                <span className="font-mono font-semibold">{port.port}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Protocol:</span>
                <Badge variant="outline">{port.protocol.toUpperCase()}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="secondary">{port.status}</Badge>
              </div>
              {port.service && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Service:</span>
                  <Badge>{port.service}</Badge>
                </div>
              )}
            </div>
          </div>

          {port.process && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Process Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Process Name:</span>
                  <span className="font-mono">{port.process.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PID:</span>
                  <span className="font-mono">{port.process.pid}</span>
                </div>
                {port.process.command && (
                  <div>
                    <span className="text-sm text-muted-foreground">Command:</span>
                    <div className="mt-1 p-2 bg-muted rounded text-xs font-mono break-all">
                      {port.process.command}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold mb-2">Timestamp</h4>
            <div className="text-sm text-muted-foreground">
              {new Date(port.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
