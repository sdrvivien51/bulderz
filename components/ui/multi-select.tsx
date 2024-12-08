'use client';

import * as React from 'react';
import { default as ReactSelect, components } from 'react-select';
import { cn } from '@/lib/utils';

export type Option = {
  value: string;
  label: string;
  description?: string;
};

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxItems?: number;
}

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Sélectionnez...',
  maxItems
}: MultiSelectProps) => {
  const [searchInput, setSearchInput] = useState('');

  const CustomOption = ({ children, isSelected, innerProps, data }: any) => (
    <div
      {...innerProps}
      className={cn(
        'flex cursor-pointer flex-col p-3 transition-colors',
        'rounded-md border border-transparent hover:bg-blue-50',
        isSelected && 'border-blue-300 bg-blue-100'
      )}
    >
      <span className="font-medium">{data.label}</span>
      {data.description && (
        <span className="text-xs text-gray-500">{data.description}</span>
      )}
    </div>
  );

  const MenuList = ({ children, ...props }: any) => (
    <components.MenuList {...props}>
      <div className="grid grid-cols-3 gap-2 p-2">{children}</div>
    </components.MenuList>
  );

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.5rem'
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 9999,
      width: '600px'
    }),
    valueContainer: (base: any) => ({
      ...base,
      maxHeight: '80px',
      overflow: 'auto',
      padding: '8px'
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: 'rgb(226 232 240)',
      borderRadius: '6px',
      padding: '2px'
    })
  };

  return (
    <ReactSelect
      isMulti
      options={options}
      value={options.filter((option) => value.includes(option.value))}
      onChange={(newValue) => {
        onChange((newValue as Option[]).map((item) => item.value));
      }}
      placeholder={placeholder}
      components={{
        Option: CustomOption,
        MenuList
      }}
      styles={customStyles}
      inputValue={searchInput}
      onInputChange={(newValue) => setSearchInput(newValue)}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      maxMenuHeight={300}
    />
  );
};

export default MultiSelect;
