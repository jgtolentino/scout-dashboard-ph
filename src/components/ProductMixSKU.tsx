export function ProductMixSKU() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Product Mix/SKU</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">What it includes:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Product combinations</li>
            <li>Cross-sell insights</li>
            <li>Frequency of purchase by product</li>
            <li>Time to run out</li>
            <li>Product popularity by cohort</li>
            <li>Popular bundle combinations</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">Toggles</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Sales history</li>
            <li>Product category</li>
            <li>Time period</li>
            <li>Region</li>
            <li>Top 10 vs. Bottom 10</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="h-48 flex items-center justify-center text-gray-400">
            [Your product mix chart]
          </div>
        </div>
      </div>
    </section>
  );
}