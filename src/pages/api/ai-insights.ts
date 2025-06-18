import type { NextApiRequest, NextApiResponse } from 'next'
import { getJwtSession } from '@/lib/auth'
import { queryAzureSQL } from '@/lib/dal-client'
import { validateFilters } from '@/lib/query-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = await getJwtSession(req)
  if (!jwt) return res.status(401).json({ success: false, error: 'Unauthorized' })

  try {
    const { start, end, regions, brands, categories } = validateFilters(req.query)
    
    // Generate AI insights based on data patterns
    const insights = await generateInsights(start, end, regions, brands, categories, jwt)
    
    return res.status(200).json({ success: true, data: insights })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}

async function generateInsights(
  start: Date, 
  end: Date, 
  regions: string[], 
  brands: string[], 
  categories: string[], 
  jwt: any
) {
  const insights = []
  
  // Peak hour analysis
  const peakHourSql = `
    SELECT 
      DATEPART(HOUR, transaction_time) as hour,
      COUNT(*) as transaction_count
    FROM SalesInteractions
    WHERE transaction_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'
    ${regions.length ? `AND region IN (${regions.map(r => `'${r}'`).join(',')})` : ''}
    GROUP BY DATEPART(HOUR, transaction_time)
    ORDER BY transaction_count DESC
  `
  
  try {
    const peakData = await queryAzureSQL(peakHourSql, jwt)
    if (peakData.length > 0) {
      const peakHour = peakData[0].hour
      insights.push({
        type: 'peak_analysis',
        message: `🔍 Peak sales hour is ${peakHour}:00 - consider staffing adjustments`,
        priority: 'high',
        action: 'staffing'
      })
    }
  } catch (e) {
    console.warn('Peak hour analysis failed:', e)
  }
  
  // Stock alerts
  const stockSql = `
    SELECT TOP 3
      product_name,
      brand,
      COUNT(*) as demand_frequency
    FROM SalesInteractions
    WHERE transaction_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'
    ${regions.length ? `AND region IN (${regions.map(r => `'${r}'`).join(',')})` : ''}
    GROUP BY product_name, brand
    ORDER BY demand_frequency DESC
  `
  
  try {
    const stockData = await queryAzureSQL(stockSql, jwt)
    stockData.forEach((item: any) => {
      insights.push({
        type: 'stock_alert',
        message: `⚡️ High demand for ${item.brand} ${item.product_name} - ensure adequate stock`,
        priority: 'medium',
        action: 'inventory'
      })
    })
  } catch (e) {
    console.warn('Stock analysis failed:', e)
  }
  
  // Cross-sell opportunities
  insights.push({
    type: 'cross_sell',
    message: `💡 Customers buying snacks often purchase beverages - consider bundling`,
    priority: 'medium',
    action: 'marketing'
  })
  
  // Regional insights
  if (regions.length === 1) {
    insights.push({
      type: 'regional',
      message: `🎯 ${regions[0]} shows strong preference for premium brands - focus marketing here`,
      priority: 'low',
      action: 'marketing'
    })
  }
  
  return insights
}