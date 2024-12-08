'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';

interface CreatePostData {
  title: string;
  description: string;
  category: string;
  html_content: string;
  json_content: any;
  published: boolean;
}

export async function createPost(data: CreatePostData) {
  try {
    console.log('Création du post avec:', data);

    const supabase = createClientComponentClient();

    // Récupérer l'utilisateur courant
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('Utilisateur non authentifié');
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          ...data,
          author_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      throw error;
    }

    return post;
  } catch (error) {
    console.error('Erreur lors de la création du post:', error);
    throw error;
  }
}
