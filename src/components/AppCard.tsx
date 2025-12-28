'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { App } from '@/types';

interface AppCardProps {
    app: App;
}

export function AppCard({ app }: AppCardProps) {
    const statusColors = {
        'live': 'bg-green-500/20 text-green-400 border-green-500/30',
        'beta': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'coming-soon': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };

    const statusLabels = {
        'live': '🟢 Live',
        'beta': '🟡 Beta',
        'coming-soon': '⚪ Coming Soon'
    };

    return (
        <Link href={`/app/${app.id}`}>
            <Card className="group relative overflow-hidden border-white/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-card/80 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                {/* Gradient Background */}
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${app.gradient || 'from-purple-500 via-pink-500 to-orange-500'} transition-opacity group-hover:opacity-20`} />

                {/* Screenshot/Gradient Preview */}
                <div className={`relative h-32 bg-gradient-to-br ${app.gradient || 'from-purple-500 via-pink-500 to-orange-500'} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="relative text-4xl font-bold text-white/80 group-hover:scale-110 transition-transform">
                        {app.name.charAt(0)}
                    </span>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant="outline"
                            className={`${statusColors[app.status]} backdrop-blur-sm text-xs`}
                        >
                            {statusLabels[app.status]}
                        </Badge>
                    </div>
                </div>

                <CardContent className="relative p-4">
                    {/* App Info */}
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-purple-400 transition-colors">
                                {app.name}
                            </h3>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            by <span className="text-foreground/80">{app.author}</span>
                        </p>

                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                            {app.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {app.tags.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="text-xs px-2 py-0 bg-white/5 hover:bg-white/10 border-white/10"
                                >
                                    {tag}
                                </Badge>
                            ))}
                            {app.tags.length > 3 && (
                                <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0 bg-white/5 border-white/10"
                                >
                                    +{app.tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
