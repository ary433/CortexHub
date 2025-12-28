'use client';

import { Badge } from '@/components/ui/badge';
import type { Category } from '@/types';

interface FilterTagsProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export function FilterTags({ categories, selectedCategory, onSelectCategory }: FilterTagsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className="focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-full"
                    >
                        <Badge
                            variant={isSelected ? 'default' : 'outline'}
                            className={`
                px-4 py-2 text-sm cursor-pointer transition-all
                ${isSelected
                                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white border-transparent hover:opacity-90'
                                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                                }
              `}
                        >
                            <span className="mr-1.5">{category.icon}</span>
                            {category.name}
                        </Badge>
                    </button>
                );
            })}
        </div>
    );
}
