import type { NextApiRequest, NextApiResponse } from 'next'
import { getJwtSession } from '@/lib/auth'
import { queryAzureSQL } from '@/lib/dal-client'
import { validateFilters, buildQuery } from '@/lib/query-utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt = await getJwtSession(req)
  if (!jwt) return res.status(401).json({ success: false, error: 'Unauthorized' })

  try {
    const { start, end, regions, brands, categories } = validateFilters(req.query)
    const sql = buildQuery({
      table: 'SalesInteractions',
      start,
      end,
      regions,
      brands,
      categories,
    })
    const data = await queryAzureSQL(sql, jwt)
    return res.status(200).json({ success: true, data })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}