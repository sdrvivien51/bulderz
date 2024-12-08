'use client';

import { useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const supabase = createClientComponentClient();

  const handleGithubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('[Auth] Github SignIn error:', error);
      toast.error('Erreur lors de la connexion avec Github');
    }
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={handleGithubSignIn}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
