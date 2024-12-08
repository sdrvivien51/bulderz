export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
  profiles?: Profile;
}

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Message>;
      };
      profiles: {
        Row: Profile;
        Insert: Profile;
        Update: Partial<Profile>;
      };
    };
  };
}
