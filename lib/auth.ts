import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSession() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();
  return session;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return session;
}
