'use client';

import { useState, useMemo } from 'react';
import { AppCard } from '@/components/AppCard';
import { SearchBar } from '@/components/SearchBar';
import { FilterTags } from '@/components/FilterTags';
import { NetworkStats } from '@/components/NetworkStats';
import appsData from '@/data/apps.json';
import type { App, Category } from '@/types';

const apps = appsData.apps as App[];
const categories = appsData.categories as Category[];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter apps based on search and category
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Category filter
      if (selectedCategory !== 'all' && app.category.toLowerCase() !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          app.name.toLowerCase().includes(query) ||
          app.description.toLowerCase().includes(query) ||
          app.tags.some(tag => tag.toLowerCase().includes(query)) ||
          app.author.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Powered by Cortensor Network</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Cortensor
            </span>{' '}
            Apps
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore community-built applications powered by decentralized AI inference.
            Search, try, and discover the future of Web3 AI.
          </p>

          {/* Network Stats */}
          <div className="flex justify-center mb-10">
            <NetworkStats />
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for oracles, research tools, bots..."
            />
          </div>

          {/* Category Filters */}
          <FilterTags
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* Apps Grid */}
      <section className="container mx-auto px-4 pb-20">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} available
          </p>
          {(searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No apps found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
