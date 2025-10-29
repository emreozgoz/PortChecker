'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { X, AlertTriangle } from 'lucide-react';

interface KillProcessButtonProps {
  pid: number;
  port: number;
  processName: string;
  onSuccess: () => void;
}

export function KillProcessButton({
  pid,
  port,
  processName,
  onSuccess,
}: KillProcessButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const killMutation = useMutation({
    mutationFn: async (force: boolean = false) => {
      const res = await fetch(`/api/port/${port}/kill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ force }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to kill process');
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success(`Process ${pid} killed successfully`);
      setShowConfirm(false);
      onSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowConfirm(true)}
        disabled={killMutation.isPending}
      >
        <X className="w-4 h-4" />
      </Button>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Kill Process?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to kill the process <strong>{processName}</strong> (PID: {pid})
              running on port <strong>{port}</strong>?
              <br />
              <br />
              This action cannot be undone and may cause data loss if the process is not shut down properly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => killMutation.mutate(false)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Kill Process
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
