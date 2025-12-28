// Cortensor Router API Client
// This module provides integration with Cortensor's decentralized inference network

const ROUTER_URL = process.env.NEXT_PUBLIC_CORTENSOR_ROUTER_URL || 'https://router.cortensor.network';
const API_KEY = process.env.CORTENSOR_API_KEY || 'default-dev-token';

interface RouterStatus {
  status: string;
  health: string;
  version?: string;
}

interface Miner {
  id: string;
  address: string;
  status: string;
  model?: string;
}

interface Session {
  id: number;
  status: string;
  tasks: number;
}

interface CompletionResponse {
  response: string;
  taskId?: number;
  minerId?: string;
}

// Get network status from Router
export async function getNetworkStatus(): Promise<RouterStatus | null> {
  try {
    const response = await fetch(`${ROUTER_URL}/api/v1/status`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.warn('Router status unavailable');
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.warn('Failed to fetch router status:', error);
    return null;
  }
}

// Get list of connected miners
export async function getMiners(): Promise<Miner[]> {
  try {
    const response = await fetch(`${ROUTER_URL}/api/v1/miners`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.warn('Miners list unavailable');
      return [];
    }
    
    return response.json();
  } catch (error) {
    console.warn('Failed to fetch miners:', error);
    return [];
  }
}

// Get active sessions
export async function getSessions(): Promise<Session[]> {
  try {
    const response = await fetch(`${ROUTER_URL}/api/v1/sessions`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.warn('Sessions list unavailable');
      return [];
    }
    
    return response.json();
  } catch (error) {
    console.warn('Failed to fetch sessions:', error);
    return [];
  }
}

// AI-powered app recommendation using Cortensor completions
export async function getAppRecommendation(
  query: string, 
  apps: { name: string; description: string; category: string }[],
  sessionId: number = 0
): Promise<CompletionResponse | null> {
  try {
    const appList = apps.map(a => `- ${a.name}: ${a.description} (${a.category})`).join('\n');
    
    const prompt = `You are a helpful assistant for CortexHub, an app catalog for Cortensor-powered applications.

Available apps:
${appList}

User query: "${query}"

Based on the user's query, recommend the most relevant app(s) and explain why. Be concise and helpful.`;

    const response = await fetch(`${ROUTER_URL}/api/v1/completions/${sessionId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        stream: false,
        timeout: 60
      })
    });
    
    if (!response.ok) {
      console.warn('Completion request failed');
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.warn('Failed to get recommendation:', error);
    return null;
  }
}

// Get network stats summary (for display)
export async function getNetworkStats() {
  const [status, miners, sessions] = await Promise.all([
    getNetworkStatus(),
    getMiners(),
    getSessions()
  ]);
  
  return {
    isOnline: status?.status === 'ok' || status?.health === 'healthy',
    minerCount: miners.length,
    sessionCount: sessions.length,
    status: status?.status || 'unknown'
  };
}

// Mock data for when API is unavailable (demo mode)
export function getMockNetworkStats() {
  return {
    isOnline: true,
    minerCount: 45,
    sessionCount: 12,
    status: 'demo'
  };
}
