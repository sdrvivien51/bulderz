'use client';

import { Card } from '@/components/ui/card';
import { ExperienceFilter } from './ExperienceFilter';
import { ContractFilter } from './ContractFilter';
import { SalaryFilter } from './SalaryFilter';
import { LocationFilter } from './LocationFilter';
import { SkillsFilter } from './SkillsFilter';
import { ToolsFilter } from './ToolsFilter';

interface JobFiltersProps {
  onExperienceChange: (experience: string[]) => void;
  onContractChange: (contracts: string[]) => void;
  onSalaryChange: (range: [number, number]) => void;
  onLocationChange: (locations: string[]) => void;
  onSkillsChange: (skills: string[]) => void;
  onToolsChange: (tools: string[]) => void;
}

export function JobFilters({
  onExperienceChange,
  onContractChange,
  onSalaryChange,
  onLocationChange,
  onSkillsChange,
  onToolsChange
}: JobFiltersProps) {
  return (
    <Card className="space-y-6 p-4">
      <ExperienceFilter onChange={onExperienceChange} />
      <ContractFilter onChange={onContractChange} />
      <SalaryFilter onChange={onSalaryChange} />
      <LocationFilter onChange={onLocationChange} />
      <SkillsFilter onChange={onSkillsChange} />
      <ToolsFilter onChange={onToolsChange} />
    </Card>
  );
}
