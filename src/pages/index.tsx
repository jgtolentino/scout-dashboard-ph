import { useFilterSync } from '../hooks/useFilterSync';
import { GlobalFilterBar } from '../components/GlobalFilterBar';
import { DrilldownBreadcrumb }  from '../components/DrilldownBreadcrumb';
import { FilterSummary }       from '../components/FilterSummary';
import { TransactionTrends }    from '../components/TransactionTrends';
import { ProductMixSKU }        from '../components/ProductMixSKU';
import { ConsumerBehavior }     from '../components/ConsumerBehavior';
import { ConsumerProfiling }    from '../components/ConsumerProfiling';
import { AIRecommendationPanel }from '../components/AIRecommendationPanel';

export default function Dashboard() {
  useFilterSync();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Scout Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive retail insights and analytics platform</p>
        </div>
      </header>
      <GlobalFilterBar />
      <DrilldownBreadcrumb />
      <main className="p-6 space-y-8">
        <FilterSummary />
        <TransactionTrends />
        <ProductMixSKU />
        <ConsumerBehavior />
        <ConsumerProfiling />
        <AIRecommendationPanel />
      </main>
    </div>
  );
}