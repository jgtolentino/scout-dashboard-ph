import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useFilterStore } from '../hooks/useFilterStore'

interface DataPoint {
  time: string
  volume: number
  avgValue: number
}

export function TransactionTrends() {
  const f = useFilterStore()
  const [data, setData]     = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string|null>(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({
      from: f.dateRange.start.toISOString(),
      to:   f.dateRange.end.toISOString(),
      ...(f.regions.length    ? { regions:    f.regions.join(',')    } : {}),
      ...(f.brands.length     ? { brands:     f.brands.join(',')     } : {}),
      ...(f.categories.length ? { categories: f.categories.join(',') } : {}),
    })

    fetch(`/api/transactions?${params.toString()}`, {
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
      <h3 className="text-xl font-semibold mb-4">Transaction Trends</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading transaction trends…</span>
        </div>
      </div>
    </section>
  )
  
  if (error) return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Transaction Trends</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="text-red-600 text-center">Error: {error}</div>
      </div>
    </section>
  )

  const chartData = {
    labels:   data.map(d => new Date(d.time).toLocaleDateString()),
    datasets: [
      { 
        label: 'Volume',    
        data: data.map(d => d.volume),    
        tension: 0.4,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label:       'Avg Value',
        data:        data.map(d => d.avgValue),
        tension:     0.4,
        yAxisID:     'y1',
        borderDash:  [4,2],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y:  { 
        position: 'left' as const,  
        title: { display: true, text: 'Volume' } 
      },
      y1: { 
        position: 'right' as const, 
        title: { display: true, text: 'Avg Value (₱)' }, 
        grid: { drawOnChartArea: false } 
      },
    },
    plugins: { 
      legend: { position: 'bottom' as const } 
    },
  }

  return (
    <section className="mb-8">
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
          <Line data={chartData} options={options} />
        </div>
      </div>
    </section>
  )
}