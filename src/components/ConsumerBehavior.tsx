import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { useFilterStore } from '../hooks/useFilterStore'

interface ConsumerData {
  loyalty_segment: string
  customer_count: number
  avg_segment_value: number
}

export function ConsumerBehavior() {
  const f = useFilterStore()
  const [data, setData] = useState<ConsumerData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({
      from: f.dateRange.start.toISOString(),
      to:   f.dateRange.end.toISOString(),
      ...(f.regions.length    ? { regions:    f.regions.join(',')    } : {}),
      ...(f.brands.length     ? { brands:     f.brands.join(',')     } : {}),
      ...(f.categories.length ? { categories: f.categories.join(',') } : {}),
    })

    fetch(`/api/consumers?${params.toString()}`, {
      headers: { 'Authorization': 'Bearer mock-token' }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setData(json.data)
        } else {
          throw new Error(json.error || 'API error')
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [
    f.dateRange.start,
    f.dateRange.end,
    f.regions.join(','),
    f.brands.join(','),
    f.categories.join(','),
  ])

  if (loading) return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Consumer Behavior</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading consumer data…</span>
        </div>
      </div>
    </section>
  )
  
  if (error) return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Consumer Behavior</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="text-red-600 text-center">Error: {error}</div>
      </div>
    </section>
  )

  const chartData = {
    labels: data.map(d => d.loyalty_segment),
    datasets: [
      {
        data: data.map(d => d.customer_count),
        backgroundColor: [
          '#3B82F6',
          '#10B981', 
          '#F59E0B',
        ],
        borderColor: [
          '#1D4ED8',
          '#059669',
          '#D97706',
        ],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  }

  return (
    <section className="mb-8">
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
          <Doughnut data={chartData} options={options} />
          {data.length > 0 && (
            <div className="mt-4 text-sm">
              {data.map(segment => (
                <div key={segment.loyalty_segment} className="flex justify-between py-1">
                  <span>{segment.loyalty_segment}:</span>
                  <span>{segment.customer_count} customers</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}