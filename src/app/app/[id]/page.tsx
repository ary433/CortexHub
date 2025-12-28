import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import appsData from '@/data/apps.json';
import type { App } from '@/types';

const apps = appsData.apps as App[];

interface AppPageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return apps.map((app) => ({
        id: app.id,
    }));
}

export async function generateMetadata({ params }: AppPageProps) {
    const { id } = await params;
    const app = apps.find((a) => a.id === id);

    if (!app) {
        return { title: 'App Not Found | CortexHub' };
    }

    return {
        title: `${app.name} | CortexHub`,
        description: app.description,
    };
}

export default async function AppPage({ params }: AppPageProps) {
    const { id } = await params;
    const app = apps.find((a) => a.id === id);

    if (!app) {
        notFound();
    }

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

    // Get related apps (same category, excluding current)
    const relatedApps = apps
        .filter(a => a.category === app.category && a.id !== app.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{app.name}</span>
                </nav>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden">
                {/* Gradient Background */}
                <div className={`absolute inset-0 h-64 bg-gradient-to-br ${app.gradient || 'from-purple-500 via-pink-500 to-orange-500'} opacity-20`} />
                <div className="absolute inset-0 h-64 bg-gradient-to-b from-transparent to-background" />

                <div className="container mx-auto px-4 py-12 relative">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* App Icon */}
                        <div className={`shrink-0 h-32 w-32 rounded-2xl bg-gradient-to-br ${app.gradient || 'from-purple-500 via-pink-500 to-orange-500'} flex items-center justify-center shadow-2xl`}>
                            <span className="text-5xl font-bold text-white">
                                {app.name.charAt(0)}
                            </span>
                        </div>

                        {/* App Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-bold">{app.name}</h1>
                                <Badge className={statusColors[app.status]}>
                                    {statusLabels[app.status]}
                                </Badge>
                            </div>

                            <p className="text-muted-foreground mb-4">
                                by{' '}
                                {app.authorUrl ? (
                                    <a
                                        href={app.authorUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-foreground hover:text-purple-400 transition-colors"
                                    >
                                        {app.author}
                                    </a>
                                ) : (
                                    <span className="text-foreground">{app.author}</span>
                                )}
                            </p>

                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                                {app.longDescription || app.description}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                {app.url && (
                                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                                        <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 transition-opacity">
                                            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Try It Now
                                        </Button>
                                    </a>
                                )}
                                {app.github && (
                                    <a href={app.github} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline">
                                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            View Source
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Features */}
                        {app.features && app.features.length > 0 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Features</h2>
                                <ul className="space-y-2">
                                    {app.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="h-5 w-5 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tags */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {app.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-white/5 border-white/10">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Info Card */}
                        <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4">
                            <h3 className="font-semibold">App Info</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Category</span>
                                    <span className="font-medium">{app.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="font-medium capitalize">{app.status.replace('-', ' ')}</span>
                                </div>
                                {app.dateAdded && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Added</span>
                                        <span className="font-medium">
                                            {new Date(app.dateAdded).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        {app.techStack && app.techStack.length > 0 && (
                            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
                                <h3 className="font-semibold mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {app.techStack.map((tech) => (
                                        <Badge key={tech} variant="outline" className="border-white/20">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Apps */}
            {relatedApps.length > 0 && (
                <section className="container mx-auto px-4 py-12 border-t border-white/10">
                    <h2 className="text-xl font-semibold mb-6">More {app.category} Apps</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedApps.map((relatedApp) => (
                            <Link
                                key={relatedApp.id}
                                href={`/app/${relatedApp.id}`}
                                className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${relatedApp.gradient || 'from-purple-500 to-pink-500'} flex items-center justify-center`}>
                                        <span className="text-lg font-bold text-white">{relatedApp.name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium group-hover:text-purple-400 transition-colors">{relatedApp.name}</h3>
                                        <p className="text-sm text-muted-foreground">by {relatedApp.author}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Back Button */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/">
                    <Button variant="outline" className="gap-2">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Catalog
                    </Button>
                </Link>
            </div>
        </div>
    );
}
