import { useEffect, useState } from 'react'
import { useFilterStore } from '../hooks/useFilterStore'

interface AIInsight {
  type: string
  message: string
  priority: 'high' | 'medium' | 'low'
  action: string
}

export function AIRecommendationPanel() {
  const f = useFilterStore()
  const [insights, setInsights] = useState<AIInsight[]>([])
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

    fetch(`/api/ai-insights?${params.toString()}`, {
      headers: { 'Authorization': 'Bearer mock-token' }
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setInsights(json.data)
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-300'
      case 'medium': return 'text-yellow-300'
      case 'low': return 'text-green-300'
      default: return 'text-white'
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'staffing': return '👥'
      case 'inventory': return '📦'
      case 'marketing': return '📈'
      default: return '💡'
    }
  }

  if (loading) return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">AI Recommendation Panel</h3>
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <span className="ml-2">Generating insights…</span>
      </div>
    </div>
  )

  if (error) return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">AI Recommendation Panel</h3>
      <div className="text-red-300">Error loading insights: {error}</div>
    </div>
  )

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-4">AI Recommendation Panel</h3>
      <ul className="space-y-3">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg">
            <span className="text-xl">{getActionIcon(insight.action)}</span>
            <div className="flex-1">
              <p className="text-white">{insight.message}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs ${getPriorityColor(insight.priority)}`}>
                  {insight.priority.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400 capitalize">{insight.action}</span>
              </div>
            </div>
          </li>
        ))}
        {insights.length === 0 && (
          <li className="text-gray-400 text-center py-4">
            No insights available for current filters
          </li>
        )}
      </ul>
    </div>
  )
}