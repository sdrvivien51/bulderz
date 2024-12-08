'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Une erreur est survenue</h1>
        <p className="mb-6 text-red-500">{error}</p>
        <Button onClick={() => router.push('/')}>Retour à l'accueil</Button>
      </div>
    </div>
  );
}
