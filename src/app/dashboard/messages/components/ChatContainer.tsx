'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

type Message = Database['public']['Tables']['messages']['Row'];

interface ChatContainerProps {
  serverMessages: Message[];
  currentUserId: string;
}

export function ChatContainer({
  serverMessages,
  currentUserId
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(serverMessages);
  const [selectedReceiverId, setSelectedReceiverId] = useState<
    string | undefined
  >();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, supabase]);

  const sendMessage = async (content: string, receiverId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            content,
            sender_id: currentUserId,
            receiver_id: receiverId,
            read: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setMessages((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput
        onSend={sendMessage}
        selectedReceiverId={selectedReceiverId}
      />
    </div>
  );
}
