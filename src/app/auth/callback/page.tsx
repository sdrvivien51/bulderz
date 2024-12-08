'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { searchParams } = new URL(window.location.href);
        const code = searchParams.get('code');

        if (code) {
          console.log('[Callback] Code récupéré:', code);
          const { data, error } =
            await supabase.auth.exchangeCodeForSession(code);

          if (error) {
            console.error('[Callback] Erreur échange session:', error);
            throw error;
          }

          console.log('[Callback] Session créée:', data);

          // Attendre un peu pour laisser le temps à la session de se propager
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Vérifier que la session est bien créée
          const {
            data: { session }
          } = await supabase.auth.getSession();
          console.log('[Callback] Session vérifiée:', session);

          if (!session) {
            throw new Error('Session non créée après échange');
          }

          console.log('[Callback] Redirection vers dashboard...');
          router.push('/dashboard');
        } else {
          throw new Error("Code non trouvé dans l'URL");
        }
      } catch (error) {
        console.error('[Callback] Erreur complète:', error);
        router.push('/auth/login?error=callback_error');
      }
    };

    handleCallback();
  }, [router, supabase.auth]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Redirection en cours...
    </div>
  );
}
