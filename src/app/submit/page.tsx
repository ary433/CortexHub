'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SubmitPage() {
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        github: '',
        description: '',
        category: '',
        tags: '',
        author: '',
    });

    const categories = ['Oracle', 'Research', 'Analytics', 'Bot', 'Developer', 'Agent'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Generate GitHub issue URL with pre-filled data
        const issueTitle = encodeURIComponent(`[New App] ${formData.name}`);
        const issueBody = encodeURIComponent(`
## App Submission

**Name:** ${formData.name}
**Author:** ${formData.author}
**URL:** ${formData.url}
**GitHub:** ${formData.github}
**Category:** ${formData.category}
**Tags:** ${formData.tags}

**Description:**
${formData.description}

---
_Submitted via CortexHub_
    `.trim());

        window.open(
            `https://github.com/cortensor/community-projects/issues/new?title=${issueTitle}&body=${issueBody}`,
            '_blank'
        );
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">Submit App</span>
                </nav>

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Submit Your{' '}
                        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            App
                        </span>
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Built something awesome with Cortensor? Share it with the community!
                        Your submission will open a GitHub issue for review.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* App Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">App Name *</label>
                        <Input
                            required
                            placeholder="My Awesome App"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name / Handle *</label>
                        <Input
                            required
                            placeholder="@username"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {/* URL */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">App URL</label>
                        <Input
                            type="url"
                            placeholder="https://myapp.com"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {/* GitHub */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub Repository</label>
                        <Input
                            type="url"
                            placeholder="https://github.com/username/repo"
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category *</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                >
                                    <Badge
                                        variant={formData.category === cat ? 'default' : 'outline'}
                                        className={`cursor-pointer transition-all ${formData.category === cat
                                                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 border-transparent'
                                                : 'bg-white/5 border-white/20 hover:bg-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </Badge>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tags</label>
                        <Input
                            placeholder="oracle, validation, consensus (comma-separated)"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="bg-white/5 border-white/10"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description *</label>
                        <textarea
                            required
                            placeholder="Describe what your app does and how it uses Cortensor..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-purple-500/50 focus:ring-purple-500/20 focus:outline-none"
                        />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 transition-opacity"
                            disabled={!formData.name || !formData.author || !formData.category || !formData.description}
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            Submit via GitHub
                        </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                        This will open a new GitHub issue in the Cortensor community repo
                    </p>
                </form>

                {/* Guidelines */}
                <div className="mt-12 rounded-xl bg-white/5 border border-white/10 p-6">
                    <h2 className="font-semibold mb-4">📝 Submission Guidelines</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            App must use Cortensor&apos;s decentralized inference
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Provide a working demo or link
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Include clear documentation
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            Open source preferred (MIT/Apache-2.0)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
