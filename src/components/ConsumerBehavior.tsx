export function ConsumerBehavior() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Consumer Behavior</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">What it includes:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Substitution behavior</li>
            <li>Brand loyalty vs brand switch</li>
            <li>Volume/frequency purchase</li>
            <li>Time of purchase (day/hour)</li>
            <li>Product affinity</li>
            <li>Buyer's journey from 1st to nth purchase</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">Toggles</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Cohort</li>
            <li>Time frame</li>
            <li>Product category</li>
            <li>Region</li>
            <li>Day of week</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="h-48 flex items-center justify-center text-gray-400">
            [Your behavior chart]
          </div>
        </div>
      </div>
    </section>
  );
}