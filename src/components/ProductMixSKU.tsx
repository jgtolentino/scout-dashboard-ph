import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { useFilterStore } from '../hooks/useFilterStore'

interface ProductData {
  product_name: string
  brand: string
  category: string
  frequency: number
  total_quantity: number
  avg_price: number
}

export function ProductMixSKU() {
  const f = useFilterStore()
  const [data, setData] = useState<ProductData[]>([])
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

    fetch(`/api/products?${params.toString()}`, {
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
      <h3 className="text-xl font-semibold mb-4">Product Mix/SKU</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading product data…</span>
        </div>
      </div>
    </section>
  )
  
  if (error) return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Product Mix/SKU</h3>
      <div className="bg-white p-8 rounded shadow">
        <div className="text-red-600 text-center">Error: {error}</div>
      </div>
    </section>
  )

  const chartData = {
    labels: data.slice(0, 10).map(d => `${d.brand} ${d.product_name}`.substring(0, 20)),
    datasets: [
      {
        label: 'Purchase Frequency',
        data: data.slice(0, 10).map(d => d.frequency),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: {
      y: { 
        beginAtZero: true,
        title: { display: true, text: 'Frequency' }
      },
    },
  }

  return (
    <section className="mb-8">
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
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </section>
  )
}