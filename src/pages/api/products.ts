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
      SELECT 
        product_name,
        brand,
        category,
        COUNT(*) as frequency,
        SUM(quantity) as total_quantity,
        ROUND(AVG(amount), 2) as avg_price
      FROM SalesInteractions
      WHERE ${where.join(' AND ')}
      GROUP BY product_name, brand, category
      ORDER BY frequency DESC
      LIMIT 20
    `
    
    const data = await queryAzureSQL(sql, jwt)
    return res.status(200).json({ success: true, data })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}