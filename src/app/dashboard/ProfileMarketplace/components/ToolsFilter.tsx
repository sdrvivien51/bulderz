'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ToolsFilterProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

const toolOptions = [
  { id: '1', name: 'VS Code', category: 'IDE' },
  { id: '2', name: 'Git', category: 'Version Control' },
  { id: '3', name: 'Docker', category: 'Containerization' },
  { id: '4', name: 'Figma', category: 'Design' },
  { id: '5', name: 'Postman', category: 'API Tools' }
];

const ToolsFilter: React.FC<ToolsFilterProps> = ({
  selectedTools,
  onToolsChange
}) => {
  const handleToolToggle = (toolName: string) => {
    const newTools = selectedTools.includes(toolName)
      ? selectedTools.filter((tool) => tool !== toolName)
      : [...selectedTools, toolName];

    onToolsChange(newTools);
  };

  const toolsByCategory = toolOptions.reduce(
    (acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = [];
      }
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof toolOptions>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Outils</h3>
        <Badge variant="secondary">
          {selectedTools.length} sélectionné
          {selectedTools.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {Object.entries(toolsByCategory).map(([category, tools]) => (
          <div key={category} className="mb-4">
            <h4 className="mb-2 text-sm font-medium">{category}</h4>
            <div className="space-y-2">
              {tools.map((tool) => (
                <div key={tool.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tool-${tool.id}`}
                    checked={selectedTools.includes(tool.name)}
                    onCheckedChange={() => handleToolToggle(tool.name)}
                  />
                  <Label htmlFor={`tool-${tool.id}`} className="text-sm">
                    {tool.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ToolsFilter;
