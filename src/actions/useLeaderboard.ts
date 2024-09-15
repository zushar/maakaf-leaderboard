import { useState, useEffect } from 'react';
import axios from 'axios';
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
    // const response = await axios.get<[Analytics, Analytics, Analytics]>("https://baas-data-provider.onrender.com/leaderboard");
    const response = await axios.get<[Analytics, Analytics, Analytics]>("http://localhost:8080/leaderboard");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Error fetching leaderboard:', error);
    }
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
