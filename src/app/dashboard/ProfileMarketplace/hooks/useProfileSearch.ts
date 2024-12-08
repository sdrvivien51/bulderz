'use client';

import { useState, useEffect } from 'react';
import { MarketplaceProfile } from '../types/profile';
import { profileService } from './profileService';

export function useProfileSearch() {
  const [profiles, setProfiles] = useState<MarketplaceProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [availableForHire, setAvailableForHire] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await profileService.getProfiles({
        search: searchTerm,
        skills: selectedSkills,
        tools: selectedTools,
        availableForHire
      });
      setProfiles(response.data);
      setHasMore(response.data.length === 10);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch profiles')
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [searchTerm, selectedSkills, selectedTools, availableForHire]);

  return {
    profiles,
    loading,
    error,
    hasMore,
    searchTerm,
    setSearchTerm,
    selectedSkills,
    setSelectedSkills,
    selectedTools,
    setSelectedTools,
    availableForHire,
    setAvailableForHire,
    fetchProfiles
  };
}
