'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/layout/Header';
import { PortList } from '@/components/port/PortList';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { CommonPorts } from '@/components/dashboard/CommonPorts';
import { PortScanForm } from '@/components/port/PortScanForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Database, Scan } from 'lucide-react';

export default function Home() {
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch listening ports with auto-refresh
  const { data: portsData, isLoading, refetch } = useQuery({
    queryKey: ['ports'],
    queryFn: async () => {
      const res = await fetch('/api/ports');
      if (!res.ok) throw new Error('Failed to fetch ports');
      return res.json();
    },
    refetchInterval: autoRefresh ? 3000 : false, // Refresh every 3 seconds
  });

  const ports = portsData?.data || [];
  const listeningPorts = ports.filter((p: any) => p.status === 'listening');

  return (
    <div className="min-h-screen bg-background">
      <Header
        autoRefresh={autoRefresh}
        onToggleRefresh={() => setAutoRefresh(!autoRefresh)}
        onRefresh={() => refetch()}
      />

      <main className="container mx-auto py-8 px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Active Ports"
            value={listeningPorts.length}
            icon={<Activity className="w-5 h-5" />}
            description="Currently listening"
          />
          <StatsCard
            title="Total Scanned"
            value={ports.length}
            icon={<Scan className="w-5 h-5" />}
            description="Last scan"
          />
          <StatsCard
            title="Processes"
            value={new Set(ports.map((p: any) => p.process?.pid).filter(Boolean)).size}
            icon={<Database className="w-5 h-5" />}
            description="Running processes"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Ports</TabsTrigger>
            <TabsTrigger value="scan">Port Scanner</TabsTrigger>
            <TabsTrigger value="reference">Port Reference</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <PortList ports={listeningPorts} isLoading={isLoading} onRefresh={() => refetch()} />
          </TabsContent>

          <TabsContent value="scan">
            <PortScanForm />
          </TabsContent>

          <TabsContent value="reference">
            <CommonPorts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
