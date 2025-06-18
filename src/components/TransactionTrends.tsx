export function TransactionTrends() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Transaction Trends</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">What it includes:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Volume by time of day & location</li>
            <li>Peso value distribution</li>
            <li>Duration of transaction</li>
            <li>Units per transaction</li>
            <li>Brand & category</li>
            <li>Average value</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">Toggles</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Time of day</li>
            <li>Region</li>
            <li>Category</li>
            <li>Week vs weekend</li>
            <li>Location</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="h-48 flex items-center justify-center text-gray-400">
            [Your time-series chart]
          </div>
        </div>
      </div>
    </section>
  );
}