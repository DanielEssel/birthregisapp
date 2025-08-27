import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface OfflineIndicatorProps {
  pendingSyncCount?: number;
  onSync?: () => void;
}

export default function OfflineIndicator({ pendingSyncCount = 0, onSync }: OfflineIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = async () => {
    if (onSync && isOnline && pendingSyncCount > 0) {
      setIsSyncing(true);
      try {
        await onSync();
      } finally {
        setIsSyncing(false);
      }
    }
  };

  if (isOnline && pendingSyncCount === 0) {
    return (
      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <Wifi className="w-4 h-4" />
        <span className="text-sm font-medium">Online - All synced</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm font-medium">Offline Mode</span>
        {pendingSyncCount > 0 && (
          <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">
            {pendingSyncCount} pending
          </span>
        )}
      </div>
    );
  }

  if (isOnline && pendingSyncCount > 0) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Online</span>
          <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
            {pendingSyncCount} to sync
          </span>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>
    );
  }

  return null;
}