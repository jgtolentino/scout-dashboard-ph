import { ParsedUrlQuery } from 'querystring'

export function validateFilters(q: ParsedUrlQuery) {
  const start = q.from ? new Date(q.from as string) : new Date(Date.now() - 30*24*60*60*1000)
  const end   = q.to   ? new Date(q.to as string)   : new Date()
  const split = (key?: string) => key?.toString().split(',').filter(Boolean) || []
  return {
    start,
    end,
    regions:    split(q.regions as string),
    brands:     split(q.brands as string),
    categories: split(q.categories as string),
  }
}

export function buildQuery(opts: {
  table: string
  start: Date
  end: Date
  regions: string[]
  brands: string[]
  categories: string[]
}) {
  const { table, start, end, regions, brands, categories } = opts
  const where = [
    `transaction_time BETWEEN '${start.toISOString()}' AND '${end.toISOString()}'`,
  ]
  if (regions.length)    where.push(`region IN (${regions.map(r => `'${r}'`).join(',')})`)
  if (brands.length)     where.push(`brand  IN (${brands.map(b => `'${b}'`).join(',')})`)
  if (categories.length) where.push(`category IN (${categories.map(c => `'${c}'`).join(',')})`)

  return `
    SELECT
      CAST(transaction_time AS DATE) AS time,
      COUNT(*)           AS volume,
      ROUND(AVG(amount),2) AS avgValue
    FROM ${table}
    WHERE ${where.join(' AND ')}
    GROUP BY CAST(transaction_time AS DATE)
    ORDER BY time
  `
}