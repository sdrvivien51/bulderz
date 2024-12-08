'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

interface SupabaseContextType {
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  loading: true,
  signOut: async () => {}
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <SupabaseContext.Provider value={{ user, loading, signOut }}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
