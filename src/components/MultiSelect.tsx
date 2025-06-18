import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface MultiSelectProps {
  icon?: React.ReactNode;
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export function MultiSelect({ icon, label, options, selected, onChange }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
      >
        {icon}
        <span className="text-sm">{label}</span>
        {selected.length > 0 && (
          <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
            {selected.length}
          </span>
        )}
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-2 max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onChange(option)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-100 rounded"
              >
                <span>{option}</span>
                {selected.includes(option) && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}