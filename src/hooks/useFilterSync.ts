import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFilterStore } from './useFilterStore';

export function useFilterSync() {
  const { query, push } = useRouter();
  const filters = useFilterStore();

  // load from URL on mount
  useEffect(() => {
    if(query.from && query.to){
      filters.setDateRange(new Date(query.from as string), new Date(query.to as string));
    }
    ;['regions','brands','categories','stores'].forEach(key => {
      const val = query[key];
      if(val) (val as string).split(',').forEach(v => {
        const fn = (filters as any)[`toggle${key[0].toUpperCase()+key.slice(1, -1)}`];
        fn && fn(v);
      });
    });
  }, []);

  // sync back to URL
  useEffect(() => {
    const qp: any = {
      from: filters.dateRange.start.toISOString(),
      to:   filters.dateRange.end.toISOString(),
    };
    if(filters.regions.length)    qp.regions    = filters.regions.join(',');
    if(filters.brands.length)     qp.brands     = filters.brands.join(',');
    if(filters.categories.length) qp.categories = filters.categories.join(',');
    if(filters.stores.length)     qp.stores     = filters.stores.join(',');
    push({ pathname: '/', query: qp }, undefined, { shallow: true });
  }, [
    filters.dateRange,
    filters.regions,
    filters.brands,
    filters.categories,
    filters.stores,
  ]);
}