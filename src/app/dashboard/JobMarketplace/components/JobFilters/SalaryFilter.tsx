'use client';

import { Slider } from '@/components/ui/slider';

interface SalaryFilterProps {
  onChange: (range: [number, number]) => void;
}

export function SalaryFilter({ onChange }: SalaryFilterProps) {
  const handleSalaryChange = (values: number[]) => {
    onChange([values[0], values[1]] as [number, number]);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Salary Range</h3>
      <Slider
        defaultValue={[30000, 150000]}
        min={0}
        max={300000}
        step={5000}
        onValueChange={handleSalaryChange}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>$0</span>
        <span>$300k</span>
      </div>
    </div>
  );
}
