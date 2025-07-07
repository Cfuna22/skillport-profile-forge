
import { useState, useEffect, useCallback } from 'react';
import { Profile, createActor } from '@/lib/canisters';

const POLLING_INTERVAL = 10000; // 10 seconds

export const useRealTimeProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  const fetchProfiles = useCallback(async () => {
    try {
      const actor = await createActor();
      
      // Check if there are updates since last fetch
      const currentUpdateTime = await actor.getLastUpdateTime();
      
      // Only fetch profiles if there are updates or it's the first load
      if (Number(currentUpdateTime) > lastUpdateTime || profiles.length === 0) {
        const allProfiles = await actor.getAllProfiles();
        setProfiles(allProfiles);
        setLastUpdateTime(Number(currentUpdateTime));
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  }, [lastUpdateTime, profiles.length]);

  const fetchTopProfiles = useCallback(async () => {
    try {
      const actor = await createActor();
      
      // Check if there are updates since last fetch
      const currentUpdateTime = await actor.getLastUpdateTime();
      
      // Only fetch profiles if there are updates or it's the first load
      if (Number(currentUpdateTime) > lastUpdateTime || profiles.length === 0) {
        const topProfiles = await actor.listTopProfiles();
        setProfiles(topProfiles);
        setLastUpdateTime(Number(currentUpdateTime));
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching top profiles:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch top profiles');
    } finally {
      setLoading(false);
    }
  }, [lastUpdateTime, profiles.length]);

  // Set up polling
  useEffect(() => {
    // Initial fetch
    fetchProfiles();

    // Set up interval for polling
    const intervalId = setInterval(fetchProfiles, POLLING_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchProfiles]);

  // Manual refresh function
  const refresh = useCallback(() => {
    setLoading(true);
    fetchProfiles();
  }, [fetchProfiles]);

  return {
    profiles,
    loading,
    error,
    refresh,
    fetchTopProfiles,
  };
};
