'use client';

import { Message } from '@/types/message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender_id === currentUserId
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender_id === currentUserId
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            <p>{message.content}</p>
            <span className="text-xs opacity-70">
              {format(new Date(message.created_at), 'HH:mm', { locale: fr })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
