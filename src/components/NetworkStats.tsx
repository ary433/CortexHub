'use client';

import { useEffect, useState } from 'react';
import { getMockNetworkStats, getNetworkStats } from '@/lib/cortensor';
import type { NetworkStats as INetworkStats } from '@/types';

export function NetworkStats() {
    const [stats, setStats] = useState<INetworkStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setIsLoading(true);
            try {
                const data = await getNetworkStats();
                // Use real data if available, otherwise use mock
                setStats(data.minerCount > 0 ? data : getMockNetworkStats());
            } catch {
                setStats(getMockNetworkStats());
            }
            setIsLoading(false);
        }

        fetchStats();
        // Refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center gap-6 py-3 px-6 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                <div className="h-4 w-20 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="flex items-center justify-center gap-6 py-3 px-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            {/* Online Status */}
            <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${stats.isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm text-muted-foreground">
                    {stats.isOnline ? 'Network Online' : 'Network Offline'}
                </span>
            </div>

            <div className="h-4 w-px bg-white/20" />

            {/* Miners */}
            <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span className="text-sm">
                    <span className="font-semibold text-foreground">{stats.minerCount}</span>
                    <span className="text-muted-foreground ml-1">Miners</span>
                </span>
            </div>

            <div className="h-4 w-px bg-white/20" />

            {/* Sessions */}
            <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                    <span className="font-semibold text-foreground">{stats.sessionCount}</span>
                    <span className="text-muted-foreground ml-1">Sessions</span>
                </span>
            </div>

            {/* Demo Badge */}
            {stats.status === 'demo' && (
                <>
                    <div className="h-4 w-px bg-white/20" />
                    <span className="text-xs text-yellow-400/80 bg-yellow-500/10 px-2 py-0.5 rounded">
                        Demo Mode
                    </span>
                </>
            )}
        </div>
    );
}
