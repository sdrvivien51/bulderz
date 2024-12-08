'use client';

import * as React from 'react';
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

interface Option {
  value: string;
  description: string;
}

interface MultiColumnSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  maxSelections?: number;
}

export function MultiColumnSelect({
  options,
  value,
  onChange,
  placeholder,
  maxSelections = Infinity
}: MultiColumnSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredOptions = options.filter(
    (option) =>
      option.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      onChange(value.filter((v) => v !== currentValue));
    } else if (value.length < maxSelections) {
      onChange([...value, currentValue]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value.length === 0
            ? placeholder
            : `${value.length} sélectionné${value.length > 1 ? 's' : ''}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher..."
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            <div className="grid grid-cols-3 gap-1 p-2">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.value}</span>
                    <span className="text-xs text-gray-500">
                      {option.description}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      'h-4 w-4',
                      value.includes(option.value) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
