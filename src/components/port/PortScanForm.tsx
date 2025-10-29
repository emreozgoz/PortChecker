'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Scan, Loader2 } from 'lucide-react';

export function PortScanForm() {
  const [startPort, setStartPort] = useState('1000');
  const [endPort, setEndPort] = useState('2000');
  const [scanResults, setScanResults] = useState<any>(null);

  const scanMutation = useMutation({
    mutationFn: async (data: { type: string; start?: number; end?: number }) => {
      const res = await fetch('/api/ports/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to scan ports');
      }

      return res.json();
    },
    onSuccess: (data) => {
      setScanResults(data.data);
      toast.success(`Scan complete! Found ${data.data.open} open ports`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleRangeScan = () => {
    const start = parseInt(startPort);
    const end = parseInt(endPort);

    if (isNaN(start) || isNaN(end) || start < 1 || end > 65535 || start > end) {
      toast.error('Invalid port range');
      return;
    }

    scanMutation.mutate({ type: 'range', start, end });
  };

  const handleCommonScan = () => {
    scanMutation.mutate({ type: 'common' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Port Scanner</CardTitle>
          <CardDescription>
            Scan for open ports on your local machine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="common" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="common">Common Ports</TabsTrigger>
              <TabsTrigger value="range">Port Range</TabsTrigger>
            </TabsList>

            <TabsContent value="common" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Scan commonly used ports (HTTP, HTTPS, databases, development servers, etc.)
              </p>
              <Button
                onClick={handleCommonScan}
                disabled={scanMutation.isPending}
                className="w-full"
              >
                {scanMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-4 w-4" />
                    Scan Common Ports
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="range" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Port</label>
                  <Input
                    type="number"
                    value={startPort}
                    onChange={(e) => setStartPort(e.target.value)}
                    placeholder="1000"
                    min="1"
                    max="65535"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Port</label>
                  <Input
                    type="number"
                    value={endPort}
                    onChange={(e) => setEndPort(e.target.value)}
                    placeholder="2000"
                    min="1"
                    max="65535"
                  />
                </div>
              </div>
              <Button
                onClick={handleRangeScan}
                disabled={scanMutation.isPending}
                className="w-full"
              >
                {scanMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="mr-2 h-4 w-4" />
                    Scan Port Range
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {scanResults && (
        <Card>
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
            <CardDescription>
              {scanResults.open} open port(s) found out of {scanResults.total} scanned
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scanResults.ports.length === 0 ? (
                <p className="text-sm text-muted-foreground">No open ports found</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {scanResults.ports.map((port: any) => (
                    <Badge key={port.port} variant="secondary">
                      Port {port.port}
                      {port.responseTime && (
                        <span className="ml-1 text-xs">({port.responseTime}ms)</span>
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
