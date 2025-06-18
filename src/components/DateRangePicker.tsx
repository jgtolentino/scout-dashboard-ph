import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangePickerProps {
  start: Date;
  end: Date;
  onChange: (start: Date, end: Date) => void;
}

export function DateRangePicker({ start, end, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-sm">
          {format(start, 'MMM d, yyyy')} - {format(end, 'MMM d, yyyy')}
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border rounded-lg shadow-lg z-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={format(start, 'yyyy-MM-dd')}
                onChange={(e) => onChange(new Date(e.target.value), end)}
                className="px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={format(end, 'yyyy-MM-dd')}
                onChange={(e) => onChange(start, new Date(e.target.value))}
                className="px-3 py-2 border rounded"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}