import { useState } from 'react';
import { Calendar, MapPin, Package, X, Filter } from 'lucide-react';
import { useFilterStore } from '../hooks/useFilterStore';
import { DateRangePicker } from './DateRangePicker';
import { MultiSelect }     from './MultiSelect';

export function GlobalFilterBar() {
  const [open, setOpen] = useState(false);
  const f = useFilterStore();
  const activeCount = f.regions.length+f.brands.length+f.categories.length+f.stores.length;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <DateRangePicker
            start={f.dateRange.start}
            end={f.dateRange.end}
            onChange={(s,e)=>f.setDateRange(s,e)}
          />
          <MultiSelect
            icon={<MapPin className="w-4 h-4"/>}
            label="Regions"
            options={['NCR','Region 3','Region 4A','Visayas','Mindanao']}
            selected={f.regions}
            onChange={r=>f.toggleRegion(r)}
          />
        </div>
        <div className="flex items-center gap-2">
          {activeCount>0 && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              {activeCount} active
            </span>
          )}
          <button onClick={()=>setOpen(!open)} className="p-2 hover:bg-gray-100 rounded"><Filter className="w-4 h-4"/></button>
          <button onClick={()=>f.clearFilters()} className="p-2 hover:bg-gray-100 rounded"><X className="w-4 h-4"/></button>
        </div>
      </div>
      {open && (
        <div className="px-4 py-4 border-t">
          <div className="grid grid-cols-4 gap-4">
            <MultiSelect label="Brands"    options={['Alaska','Oishi','Del Monte']} selected={f.brands}    onChange={b=>f.toggleBrand(b)} />
            <MultiSelect label="Categories"options={['Beverages','Snacks','Dairy']}        selected={f.categories}onChange={c=>f.toggleCategory(c)} />
            <MultiSelect label="Stores"    options={['Store 1','Store 2']}               selected={f.stores}    onChange={s=>f.toggleStore(s)} />
            <div>
              <h3 className="mb-2 font-medium">Quick Presets</h3>
              <button onClick={()=>f.applyPreset('ncr-focus')}      className="block w-full mb-1 text-left">NCR Last 7 Days</button>
              <button onClick={()=>f.applyPreset('premium-brands')}className="block w-full text-left">Premium Brands</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}