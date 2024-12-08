import { mockProfiles } from '../data/mockProfiles';
import { MarketplaceProfile } from '../types/profile';
import { ProfileFilters } from '../types/api';

export const profileService = {
  async getProfiles(
    filters: ProfileFilters = {}
  ): Promise<{ data: MarketplaceProfile[] }> {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredProfiles = [...mockProfiles];

    // Appliquer les filtres
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filteredProfiles = filteredProfiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(search) ||
          profile.tagline.toLowerCase().includes(search)
      );
    }

    if (filters.skills?.length) {
      filteredProfiles = filteredProfiles.filter((profile) =>
        filters.skills.some((skill) => profile.skills.includes(skill))
      );
    }

    if (filters.tools?.length) {
      filteredProfiles = filteredProfiles.filter((profile) =>
        filters.tools.some((toolId) =>
          profile.tools.some((t) => t.id === toolId)
        )
      );
    }

    if (filters.availableForHire !== undefined) {
      filteredProfiles = filteredProfiles.filter(
        (profile) => profile.availableForHire === filters.availableForHire
      );
    }

    // Pagination
    const start = ((filters.page || 1) - 1) * (filters.limit || 10);
    const end = start + (filters.limit || 10);
    const paginatedProfiles = filteredProfiles.slice(start, end);

    return {
      data: paginatedProfiles
    };
  }
};
