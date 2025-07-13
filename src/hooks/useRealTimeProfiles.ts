
import { useState, useEffect, useCallback } from 'react';
import { Profile, createActor } from '@/lib/canisters';
import { dummyProfiles } from '@/utils/dummyData';

const POLLING_INTERVAL = 10000; // 10 seconds

export const useRealTimeProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  const [usingDummyData, setUsingDummyData] = useState(false);

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
        setUsingDummyData(false);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching profiles from canister, falling back to dummy data:', err);
      
      // Fall back to dummy data when canister is not available
      if (profiles.length === 0) {
        console.log('Using dummy data as fallback');
        setProfiles(dummyProfiles as Profile[]);
        setUsingDummyData(true);
      }
      
      setError(null); // Don't show error when using dummy data fallback
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
        setUsingDummyData(false);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching top profiles from canister, falling back to dummy data:', err);
      
      // Fall back to dummy data when canister is not available
      if (profiles.length === 0) {
        console.log('Using dummy data as fallback for top profiles');
        // Sort dummy profiles by endorsement count for "top" profiles
        const sortedDummyProfiles = [...dummyProfiles].sort((a, b) => 
          b.endorsements.length - a.endorsements.length
        );
        setProfiles(sortedDummyProfiles as Profile[]);
        setUsingDummyData(true);
      }
      
      setError(null); // Don't show error when using dummy data fallback
    } finally {
      setLoading(false);
    }
  }, [lastUpdateTime, profiles.length]);

  // Set up polling
  useEffect(() => {
    // Initial fetch
    fetchProfiles();

    // Set up interval for polling only if not using dummy data
    let intervalId: NodeJS.Timeout | null = null;
    if (!usingDummyData) {
      intervalId = setInterval(fetchProfiles, POLLING_INTERVAL);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchProfiles, usingDummyData]);

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
    usingDummyData,
  };
};
