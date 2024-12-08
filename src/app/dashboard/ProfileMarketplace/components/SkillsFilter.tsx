'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface SkillsFilterProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const skillOptions = [
  { id: '1', name: 'React', category: 'Frontend' },
  { id: '2', name: 'TypeScript', category: 'Languages' },
  { id: '3', name: 'Node.js', category: 'Backend' },
  { id: '4', name: 'Python', category: 'Backend' },
  { id: '5', name: 'AWS', category: 'Cloud' }
];

const SkillsFilter: React.FC<SkillsFilterProps> = ({
  selectedSkills,
  onSkillsChange
}) => {
  const handleSkillToggle = (skillName: string) => {
    const newSkills = selectedSkills.includes(skillName)
      ? selectedSkills.filter((skill) => skill !== skillName)
      : [...selectedSkills, skillName];

    onSkillsChange(newSkills);
  };

  const skillsByCategory = skillOptions.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skillOptions>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Compétences</h3>
        <Badge variant="secondary">
          {selectedSkills.length} sélectionnée
          {selectedSkills.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        {Object.entries(skillsByCategory).map(([category, skills]) => (
          <div key={category} className="mb-4">
            <h4 className="mb-2 text-sm font-medium">{category}</h4>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.id}`}
                    checked={selectedSkills.includes(skill.name)}
                    onCheckedChange={() => handleSkillToggle(skill.name)}
                  />
                  <Label htmlFor={`skill-${skill.id}`} className="text-sm">
                    {skill.name}
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

export default SkillsFilter;
