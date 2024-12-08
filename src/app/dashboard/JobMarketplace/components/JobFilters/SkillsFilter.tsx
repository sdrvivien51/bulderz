'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
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

// Simulating the skills data structure from ProfileMarketplace
const skills = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend'
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'Languages'
  },
  {
    id: '3',
    name: 'Node.js',
    category: 'Backend'
  },
  {
    id: '4',
    name: 'AWS',
    category: 'Cloud'
  },
  {
    id: '5',
    name: 'Docker',
    category: 'DevOps'
  },
  {
    id: '6',
    name: 'PostgreSQL',
    category: 'Database'
  }
].sort((a, b) => a.category.localeCompare(b.category));

interface SkillsFilterProps {
  onChange: (skills: string[]) => void;
}

export function SkillsFilter({ onChange }: SkillsFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = acc[skill.category] || [];
      return {
        ...acc,
        [skill.category]: [...category, skill]
      };
    },
    {} as Record<string, typeof skills>
  );

  const handleSelect = (skillName: string) => {
    const newSelection = selectedSkills.includes(skillName)
      ? selectedSkills.filter((s) => s !== skillName)
      : [...selectedSkills, skillName];

    setSelectedSkills(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Compétences</h3>
        <Badge variant="secondary">
          {selectedSkills.length} sélectionnée
          {selectedSkills.length > 1 ? 's' : ''}
        </Badge>
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
              {selectedSkills.length > 0
                ? `${selectedSkills.length} compétence${
                    selectedSkills.length > 1 ? 's' : ''
                  }`
                : 'Sélectionner des compétences'}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher une compétence..." />
            <CommandEmpty>Aucune compétence trouvée.</CommandEmpty>
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => (
                <CommandGroup key={category} heading={category}>
                  {categorySkills.map((skill) => (
                    <CommandItem
                      key={skill.id}
                      value={skill.name}
                      onSelect={() => handleSelect(skill.name)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedSkills.includes(skill.name)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {skill.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
