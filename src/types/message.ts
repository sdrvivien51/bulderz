export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
}

export interface ChatUser {
  id: string;
  full_name: string;
  avatar_url?: string;
}
