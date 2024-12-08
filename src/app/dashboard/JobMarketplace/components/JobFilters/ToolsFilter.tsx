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

// Simulating the tools data structure from ProfileMarketplace
const tools = [
  {
    id: '1',
    name: 'VS Code',
    category: 'IDE'
  },
  {
    id: '2',
    name: 'Git',
    category: 'Version Control'
  },
  {
    id: '3',
    name: 'Jira',
    category: 'Project Management'
  },
  {
    id: '4',
    name: 'Figma',
    category: 'Design'
  },
  {
    id: '5',
    name: 'Postman',
    category: 'API Tools'
  }
].sort((a, b) => a.category.localeCompare(b.category));

interface ToolsFilterProps {
  onChange: (tools: string[]) => void;
}

export function ToolsFilter({ onChange }: ToolsFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Group tools by category
  const toolsByCategory = tools.reduce(
    (acc, tool) => {
      const category = acc[tool.category] || [];
      return {
        ...acc,
        [tool.category]: [...category, tool]
      };
    },
    {} as Record<string, typeof tools>
  );

  const handleSelect = (toolName: string) => {
    const newSelection = selectedTools.includes(toolName)
      ? selectedTools.filter((t) => t !== toolName)
      : [...selectedTools, toolName];

    setSelectedTools(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Outils</h3>
        <Badge variant="secondary">
          {selectedTools.length} sélectionné
          {selectedTools.length > 1 ? 's' : ''}
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
              {selectedTools.length > 0
                ? `${selectedTools.length} outil${
                    selectedTools.length > 1 ? 's' : ''
                  }`
                : 'Sélectionner des outils'}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher un outil..." />
            <CommandEmpty>Aucun outil trouvé.</CommandEmpty>
            {Object.entries(toolsByCategory).map(
              ([category, categoryTools]) => (
                <CommandGroup key={category} heading={category}>
                  {categoryTools.map((tool) => (
                    <CommandItem
                      key={tool.id}
                      value={tool.name}
                      onSelect={() => handleSelect(tool.name)}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedTools.includes(tool.name)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {tool.name}
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
