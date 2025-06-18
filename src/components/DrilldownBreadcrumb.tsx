import { Home, ChevronRight } from 'lucide-react';
import { useFilterStore } from '../hooks/useFilterStore';

export function DrilldownBreadcrumb() {
  const { drilldownPath, removeDrilldown } = useFilterStore();
  if(!drilldownPath.length) return null;

  return (
    <nav className="flex items-center gap-2 px-4 py-2 bg-gray-50">
      <button onClick={()=>removeDrilldown(0)} className="flex items-center gap-1 text-sm">
        <Home className="w-4 h-4"/> Overview
      </button>
      {drilldownPath.map((d,i)=>(
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-gray-400"/>
          <button onClick={()=>removeDrilldown(i+1)} className="text-sm">
            {d.level}: {d.value}
          </button>
        </span>
      ))}
    </nav>
  );
}