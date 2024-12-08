'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface PostHeaderProps {
  onUpdate: (data: { title: string; description: string }) => void;
}

export function PostHeader({ onUpdate }: PostHeaderProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onUpdate({ title: e.target.value, description });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    onUpdate({ title, description: e.target.value });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Titre de l'article"
        value={title}
        onChange={handleTitleChange}
        className="text-2xl font-bold"
      />
      <Textarea
        placeholder="Description courte de l'article"
        value={description}
        onChange={handleDescriptionChange}
        className="resize-none"
        rows={2}
      />
    </div>
  );
}
