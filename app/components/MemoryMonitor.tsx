'use client';

import { useEffect, useState } from 'react';

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
}

export default function MemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('performance' in window && 'memory' in performance) {
      setIsSupported(true);
      
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize
        });
      };

      updateMemory();
      
      const interval = setInterval(updateMemory, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isSupported || !memoryInfo) {
    return (
      <div className="fixed bottom-4 right-4 bg-surface-elevated border border-border rounded-lg p-3 text-xs">
        <div className="text-text-muted">Memory monitoring not supported in this browser</div>
      </div>
    );
  }


  return (
    <div className="fixed bottom-4 right-4 bg-surface-elevated border border-border rounded-lg p-3 text-xs space-y-1 min-w-48">
      <div className="text-text-primary font-bold">JS Heap Memory</div>
      <div className="flex justify-between">
        <span className="text-text-secondary">Used:</span>
        <span className="text-text-primary">{formatBytes(memoryInfo.usedJSHeapSize)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-text-secondary">Total:</span>
        <span className="text-text-primary">{formatBytes(memoryInfo.totalJSHeapSize)}</span>
      </div>
      
      <div className="text-text-muted text-center text-xs border-t border-border pt-1 mt-2">
        ⚠️ JS heap only - not total browser memory
      </div>
      <div className="text-text-muted text-center text-xs">
        Chrome/Edge only • Updates every second
        </div>
    </div>
  );
}