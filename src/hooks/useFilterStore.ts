import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface DrillEntry {
  level: string;
  value: string;
  filters: { regions: string[]; brands: string[]; categories: string[] };
}

interface FilterState {
  dateRange: { start: Date; end: Date };
  regions: string[];
  brands: string[];
  categories: string[];
  stores: string[];
  drilldownPath: DrillEntry[];
  setDateRange: (s: Date, e: Date) => void;
  toggleRegion: (r: string) => void;
  toggleBrand: (b: string) => void;
  toggleCategory: (c: string) => void;
  toggleStore: (s: string) => void;
  addDrilldown: (level: string, value: string) => void;
  removeDrilldown: (idx: number) => void;
  clearFilters: () => void;
  applyPreset: (p: string) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    immer((set, get) => ({
      dateRange: {
        start: new Date(Date.now() - 30*24*60*60*1000),
        end: new Date(),
      },
      regions: [],
      brands: [],
      categories: [],
      stores: [],
      drilldownPath: [],
      setDateRange: (s,e) => set(state => { state.dateRange = { start: s, end: e }; }),
      toggleRegion: r => set(state => {
        const i = state.regions.indexOf(r);
        i>-1 ? state.regions.splice(i,1) : state.regions.push(r);
      }),
      toggleBrand: b => set(state => {
        const i = state.brands.indexOf(b);
        i>-1 ? state.brands.splice(i,1) : state.brands.push(b);
      }),
      toggleCategory: c => set(state => {
        const i = state.categories.indexOf(c);
        i>-1 ? state.categories.splice(i,1) : state.categories.push(c);
      }),
      toggleStore: s => set(state => {
        const i = state.stores.indexOf(s);
        i>-1 ? state.stores.splice(i,1) : state.stores.push(s);
      }),
      addDrilldown: (level, value) => set(state => {
        state.drilldownPath.push({
          level,
          value,
          filters: {
            regions: [...state.regions],
            brands: [...state.brands],
            categories: [...state.categories],
          },
        });
      }),
      removeDrilldown: idx => set(state => {
        state.drilldownPath = state.drilldownPath.slice(0, idx);
        if(idx>0){
          const prev = state.drilldownPath[idx-1];
          state.regions = [...prev.filters.regions];
          state.brands = [...prev.filters.brands];
          state.categories = [...prev.filters.categories];
        }
      }),
      clearFilters: () => set(state => {
        state.regions = []; state.brands = []; state.categories = [];
        state.stores = []; state.drilldownPath = [];
      }),
      applyPreset: p => set(state => {
        if(p==='ncr-focus'){
          state.regions = ['NCR'];
          state.dateRange = {
            start: new Date(Date.now() - 7*24*60*60*1000),
            end: new Date(),
          };
        }
        if(p==='premium-brands'){
          state.brands = ['Alaska','Del Monte'];
          state.categories = ['Dairy','Processed Foods'];
        }
      }),
    })),
    { name: 'scout-filters' }
  )
);