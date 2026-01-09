'use client';

import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function FilterDropdown({
  types,
  selectedType,
  onTypeChange,
}: FilterDropdownProps) {
  return (
    <div className="mb-6">
      <label htmlFor="type-filter" className="block text-sm font-medium text-foreground mb-2">
        Filter by Type
      </label>
      <div className="relative inline-block w-full md:w-64">
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="appearance-none w-full bg-white border border-gray-300 text-foreground py-2 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
}
