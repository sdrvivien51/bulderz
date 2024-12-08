import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  html_content: string;
  json_content: any;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export async function createPost(
  post: Omit<Post, 'id' | 'created_at' | 'updated_at'>
) {
  const supabase = createClientComponentClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw new Error('Utilisateur non authentifié');
  }

  console.log('Création du post avec:', {
    ...post,
    author_id: session.user.id
  });

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        ...post,
        author_id: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Erreur Supabase:', {
      error,
      sessionId: session.user.id,
      postData: post
    });
    throw error;
  }

  return data;
}
