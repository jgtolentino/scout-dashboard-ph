import { X } from 'lucide-react';
import { useFilterStore } from '../hooks/useFilterStore';

export function FilterSummary() {
  const f = useFilterStore();
  const groups = [
    { name:'Regions', vals:f.regions,   clear:()=>f.regions = [] },
    { name:'Brands',  vals:f.brands,    clear:()=>f.brands = [] },
    { name:'Categories',vals:f.categories,clear:()=>f.categories = [] },
  ].filter(g=>g.vals.length);

  if(!groups.length) return null;

  return (
    <div className="p-3 mb-4 bg-blue-50 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Active Filters</span>
        <button onClick={()=>f.clearFilters()} className="text-sm">Clear all</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {groups.map((g,i)=>(
          <div key={i} className="flex items-center gap-1 px-2 py-1 bg-white rounded">
            <span className="text-xs font-medium">{g.name}:</span>
            <span className="text-xs">{g.vals.join(', ')}</span>
            <button onClick={g.clear} className="p-0.5 hover:bg-gray-100 rounded">
              <X className="w-3 h-3"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}