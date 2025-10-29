'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { COMMON_PORTS, searchPorts } from '@/lib/data/commonPorts';
import { Search } from 'lucide-react';

export function CommonPorts() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPorts = searchQuery
    ? searchPorts(searchQuery)
    : COMMON_PORTS;

  const categories = ['all', 'web', 'database', 'development', 'email', 'other'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Ports Reference</CardTitle>
        <CardDescription>
          Reference guide for commonly used ports
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ports by name, service, or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {categories.map(category => {
            const categoryPorts = category === 'all'
              ? filteredPorts
              : filteredPorts.filter(p => p.category === category);

            if (categoryPorts.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold mb-2 capitalize">
                  {category}
                  <Badge variant="outline" className="ml-2">
                    {categoryPorts.length}
                  </Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {categoryPorts.map(port => (
                    <div
                      key={port.port}
                      className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-semibold">{port.port}</span>
                          <Badge variant="secondary" className="text-xs">
                            {port.service}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {port.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {port.protocol.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPorts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No ports found matching "{searchQuery}"
          </div>
        )}
      </CardContent>
    </Card>
  );
}
