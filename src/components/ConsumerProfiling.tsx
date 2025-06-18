export function ConsumerProfiling() {
  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">Consumer Profiling</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">What it includes:</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Create cohort based on filters</li>
            <li>Track cohort over time</li>
            <li>Migration of one cohort to another</li>
            <li>Retention & lapse analysis</li>
            <li>Cohort value over time</li>
            <li>Category penetration by cohort</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h4 className="font-medium mb-2">Toggles</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Save cohort</li>
            <li>Time dimension</li>
            <li>Compare cohorts</li>
            <li>Export cohort list</li>
            <li>Cohort filter combination</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="h-48 flex items-center justify-center text-gray-400">
            [Your cohort analysis chart]
          </div>
        </div>
      </div>
    </section>
  );
}