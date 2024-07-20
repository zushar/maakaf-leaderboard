import { useState, useEffect } from 'react';

export type Analytics = {
  members: {
    name: string;
    node_id: string;
    projects_names: {
      url: string;
      name: string;
    }[];
    avatar_url: string;
    score: number;
    stats: {
      additions: number;
      deletions: number;
      commits: number;
    };
  }[];
  since: number;
  until: number;
  stat: 'allTimes' | 'lastMonth' | 'lastWeek';
};


async function fetchLeaderboard(): Promise<[Analytics, Analytics, Analytics]> {
  try {
    const response = await fetch("/leaderboard", {
      credentials: 'include', // This includes cookies in the request
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as [Analytics, Analytics, Analytics];
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<[Analytics, Analytics, Analytics] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await fetchLeaderboard();
        console.log(data);
        setLeaderboard(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching the leaderboard'));
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return { leaderboard, loading, error };
}
