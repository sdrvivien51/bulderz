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
import { Badge } from '@/components/ui/badge';

interface Option {
  value: string;
  description: string;
}

interface CommandSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  maxSelections?: number;
}

export function CommandSelect({
  options,
  value,
  onChange,
  placeholder,
  maxSelections
}: CommandSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    if (value.includes(currentValue)) {
      onChange(value.filter((v) => v !== currentValue));
    } else if (!maxSelections || value.length < maxSelections) {
      onChange([...value, currentValue]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
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
              : `${value.length} sélectionné(s)`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[600px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Rechercher..." />
            <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              <div className="grid grid-cols-3 gap-2 p-2">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex cursor-pointer flex-col items-start p-2"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">{option.value}</span>
                      <Check
                        className={cn(
                          'h-4 w-4',
                          value.includes(option.value)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {item}
              <span className="ml-1">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
