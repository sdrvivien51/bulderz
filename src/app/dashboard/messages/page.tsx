'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatContainer } from './components/ChatContainer';
import { ConversationsList } from './components/ConversationsList';
import { Session } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export default function MessagesPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [conversations, setConversations] = useState<Message[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session: currentSession }
        } = await supabase.auth.getSession();

        if (!currentSession) {
          router.push('/auth/login');
          return;
        }

        setSession(currentSession);

        const { data: conversationsData, error } = await supabase
          .from('messages')
          .select(
            `
            id,
            content,
            sender_id,
            receiver_id,
            created_at,
            read,
            profiles!sender_id (
              id,
              full_name,
              avatar_url
            )
          `
          )
          .or(
            `sender_id.eq.${currentSession.user.id},receiver_id.eq.${currentSession.user.id}`
          )
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching conversations:', error);
          return;
        }

        setConversations(conversationsData || []);
      } catch (error) {
        console.error('Error in checkAuth:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router, supabase]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid h-[calc(100vh-200px)] grid-cols-4 gap-6">
        <div className="col-span-1 border-r">
          <ConversationsList
            conversations={conversations}
            currentUserId={session.user.id}
          />
        </div>

        <div className="col-span-3">
          <ChatContainer
            serverMessages={conversations}
            currentUserId={session.user.id}
          />
        </div>
      </div>
    </div>
  );
}
