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
    const where = [
      `transaction_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
    ]
    if (regions.length)    where.push(`region IN (${regions.map(r => `'${r}'`).join(',')})`)
    if (brands.length)     where.push(`brand  IN (${brands.map(b => `'${b}'`).join(',')})`)
    if (categories.length) where.push(`category IN (${categories.map(c => `'${c}'`).join(',')})`)

    const sql = `
      WITH CustomerBehavior AS (
        SELECT 
          customer_id,
          COUNT(DISTINCT brand) as brand_diversity,
          COUNT(*) as purchase_frequency,
          ROUND(AVG(amount), 2) as avg_basket_value,
          DATEPART(HOUR, transaction_time) as preferred_hour
        FROM SalesInteractions
        WHERE ${where.join(' AND ')}
        GROUP BY customer_id
      )
      SELECT 
        CASE 
          WHEN brand_diversity = 1 THEN 'Brand Loyal'
          WHEN brand_diversity <= 3 THEN 'Moderate Switcher'
          ELSE 'High Switcher'
        END as loyalty_segment,
        COUNT(*) as customer_count,
        ROUND(AVG(avg_basket_value), 2) as avg_segment_value
      FROM CustomerBehavior
      GROUP BY CASE 
          WHEN brand_diversity = 1 THEN 'Brand Loyal'
          WHEN brand_diversity <= 3 THEN 'Moderate Switcher'
          ELSE 'High Switcher'
        END
    `
    
    const data = await queryAzureSQL(sql, jwt)
    return res.status(200).json({ success: true, data })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}