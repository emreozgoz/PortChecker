'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw, Power } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  autoRefresh: boolean;
  onToggleRefresh: () => void;
  onRefresh: () => void;
}

export function Header({ autoRefresh, onToggleRefresh, onRefresh }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Power className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PortChecker</h1>
              <p className="text-sm text-muted-foreground">
                Monitor and manage your ports
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={onRefresh}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <Button
              onClick={onToggleRefresh}
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
            >
              {autoRefresh ? (
                <>
                  <Badge variant="secondary" className="mr-2">
                    ON
                  </Badge>
                  Auto-Refresh
                </>
              ) : (
                <>
                  <Badge variant="outline" className="mr-2">
                    OFF
                  </Badge>
                  Auto-Refresh
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
