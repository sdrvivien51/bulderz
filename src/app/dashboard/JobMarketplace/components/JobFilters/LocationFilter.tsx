'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface LocationFilterProps {
  onChange: (locations: string[]) => void;
}

export function LocationFilter({ onChange }: LocationFilterProps) {
  const [location, setLocation] = useState('');

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onChange([value]); // For now, sending as array for consistency
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Location</h3>
      <Input
        type="text"
        placeholder="Enter location..."
        value={location}
        onChange={(e) => handleLocationChange(e.target.value)}
      />
    </div>
  );
}
