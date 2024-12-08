'use client';

import { Message } from '@/types/message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ConversationsListProps {
  conversations: Message[];
  currentUserId: string;
}

export function ConversationsList({
  conversations,
  currentUserId
}: ConversationsListProps) {
  // Grouper les conversations par utilisateur
  const groupedConversations = conversations.reduce(
    (acc, message) => {
      const otherId =
        message.sender_id === currentUserId
          ? message.receiver_id
          : message.sender_id;
      if (!acc[otherId]) {
        acc[otherId] = [];
      }
      acc[otherId].push(message);
      return acc;
    },
    {} as Record<string, Message[]>
  );

  return (
    <div className="space-y-2">
      {Object.entries(groupedConversations).map(([userId, messages]) => {
        const lastMessage = messages[0]; // Messages sont déjà triés par date
        const isLastMessageFromMe = lastMessage.sender_id === currentUserId;

        return (
          <div
            key={userId}
            className="cursor-pointer rounded-lg p-4 transition-colors hover:bg-accent"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={lastMessage.profiles?.avatar_url} />
                <AvatarFallback>
                  {lastMessage.profiles?.full_name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">
                  {lastMessage.profiles?.full_name || 'Utilisateur'}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {isLastMessageFromMe ? 'Vous : ' : ''}
                  {lastMessage.content}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {format(new Date(lastMessage.created_at), 'HH:mm', {
                  locale: fr
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
