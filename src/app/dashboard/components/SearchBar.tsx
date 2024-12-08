'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  className
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher des profils..."
        value={value}
        onChange={onChange}
        className="pl-8"
      />
    </div>
  );
}
