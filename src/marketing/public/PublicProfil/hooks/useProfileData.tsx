import { useState, useEffect } from 'react';
import { UserProfile, Project, Post } from '../types/profile';

interface ProfileDataState {
  data: UserProfile | null;
  loading: boolean;
  error: Error | null;
}

export function useProfileData(username: string) {
  const [state, setState] = useState<ProfileDataState>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        // Simulez un appel API
        const response = await fetch(`/api/profile/${username}`);

        if (!response.ok) {
          throw new Error('Impossible de charger le profil');
        }

        const profileData = await response.json();

        setState({
          data: profileData,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error
              : new Error('Une erreur est survenue')
        });
      }
    }

    fetchProfileData();
  }, [username]);

  return state;
}
