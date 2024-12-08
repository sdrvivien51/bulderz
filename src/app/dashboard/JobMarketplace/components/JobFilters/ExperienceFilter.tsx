'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const experienceLevels = [
  { value: 'Junior', label: 'Junior (0-2 ans)' },
  { value: 'Intermediaire', label: 'Intermédiaire (2-5 ans)' },
  { value: 'Senior', label: 'Senior (5-8 ans)' },
  { value: 'Expert', label: 'Expert (8+ ans)' }
];

interface ExperienceFilterProps {
  onChange: (experience: string[]) => void;
}

export function ExperienceFilter({ onChange }: ExperienceFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const handleSelect = (experience: string) => {
    const newSelection = selectedExperience.includes(experience)
      ? selectedExperience.filter((e) => e !== experience)
      : [...selectedExperience, experience];

    setSelectedExperience(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Experience Level</h3>
        <Badge variant="secondary">{selectedExperience.length} selected</Badge>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {selectedExperience.length > 0
                ? `${selectedExperience.length} level${
                    selectedExperience.length > 1 ? 's' : ''
                  }`
                : 'Select level'}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search experience level..." />
            <CommandEmpty>No experience level found.</CommandEmpty>
            <CommandGroup>
              {experienceLevels.map((level) => (
                <CommandItem
                  key={level.value}
                  value={level.value}
                  onSelect={() => handleSelect(level.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedExperience.includes(level.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {level.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
