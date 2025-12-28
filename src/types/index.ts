// App types for CortexHub

export interface App {
    id: string;
    name: string;
    author: string;
    authorUrl?: string;
    url?: string;
    github?: string;
    description: string;
    longDescription?: string;
    tags: string[];
    category: string;
    status: 'live' | 'beta' | 'coming-soon';
    gradient?: string;
    screenshot?: string;
    techStack?: string[];
    features?: string[];
    dateAdded?: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface AppRegistry {
    apps: App[];
    categories: Category[];
}

export interface NetworkStats {
    isOnline: boolean;
    minerCount: number;
    sessionCount: number;
    status: string;
}
