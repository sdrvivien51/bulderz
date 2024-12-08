'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ContractFilterProps {
  onChange: (contracts: string[]) => void;
}

export function ContractFilter({ onChange }: ContractFilterProps) {
  const contractTypes = [
    'Full-time',
    'Part-time',
    'Contract',
    'Freelance',
    'Internship'
  ];

  const handleContractChange = (checked: boolean, contract: string) => {
    const updatedContracts = checked
      ? [contract] // For now, let's keep it simple with single selection
      : [];
    onChange(updatedContracts);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Contract Type</h3>
      <div className="space-y-2">
        {contractTypes.map((contract) => (
          <div key={contract} className="flex items-center space-x-2">
            <Checkbox
              id={`contract-${contract}`}
              onCheckedChange={(checked) =>
                handleContractChange(checked as boolean, contract)
              }
            />
            <Label htmlFor={`contract-${contract}`}>{contract}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
