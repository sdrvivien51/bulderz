import { useState, useEffect, useCallback } from 'react';
import { MarketplaceProfile } from '../types/profile';
import { mockProfiles } from '../data/mockProfiles';

export function useInfiniteProfileScroll(
  initialProfiles: MarketplaceProfile[],
  filters: {
    searchTerm: string;
    selectedSkills: string[];
    selectedTools: string[];
  }
) {
  const [profiles, setProfiles] =
    useState<MarketplaceProfile[]>(initialProfiles);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMoreProfiles = useCallback(() => {
    // Simuler un chargement de profils supplémentaires
    const newProfiles = mockProfiles
      .filter(
        (profile) =>
          // Appliquer les filtres ici
          profile.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) &&
          (filters.selectedSkills.length === 0 ||
            profile.skills.some((skill) =>
              filters.selectedSkills.includes(skill.id)
            )) &&
          (filters.selectedTools.length === 0 ||
            profile.tools.some((tool) =>
              filters.selectedTools.includes(tool.id)
            ))
      )
      .slice(page * 10, (page + 1) * 10);

    if (newProfiles.length === 0) {
      setHasMore(false);
    } else {
      setProfiles((prev) => [...prev, ...newProfiles]);
      setPage((prev) => prev + 1);
    }
  }, [page, filters]);

  return { profiles, loadMoreProfiles, hasMore };
}
