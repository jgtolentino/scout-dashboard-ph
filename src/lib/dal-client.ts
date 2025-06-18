import { ConnectionPool } from 'mssql'

// Mock data for development - replace with real database connection in production
const mockData = {
  transactions: [
    { time: '2025-06-01', volume: 145, avgValue: 850.50 },
    { time: '2025-06-02', volume: 132, avgValue: 720.25 },
    { time: '2025-06-03', volume: 178, avgValue: 950.75 },
    { time: '2025-06-04', volume: 156, avgValue: 880.30 },
    { time: '2025-06-05', volume: 167, avgValue: 920.45 },
    { time: '2025-06-06', volume: 134, avgValue: 760.80 },
    { time: '2025-06-07', volume: 189, avgValue: 1050.60 },
  ],
  products: [
    { product_name: 'Chocolate Bar', brand: 'Alaska', category: 'Snacks', frequency: 89, total_quantity: 245, avg_price: 45.50 },
    { product_name: 'Milk Tea', brand: 'Oishi', category: 'Beverages', frequency: 76, total_quantity: 198, avg_price: 65.00 },
    { product_name: 'Fresh Milk', brand: 'Del Monte', category: 'Dairy', frequency: 67, total_quantity: 156, avg_price: 85.25 },
    { product_name: 'Cheese Crackers', brand: 'Alaska', category: 'Snacks', frequency: 54, total_quantity: 134, avg_price: 32.75 },
    { product_name: 'Fruit Juice', brand: 'Del Monte', category: 'Beverages', frequency: 45, total_quantity: 98, avg_price: 55.50 },
  ],
  consumers: [
    { loyalty_segment: 'Brand Loyal', customer_count: 450, avg_segment_value: 1250.75 },
    { loyalty_segment: 'Moderate Switcher', customer_count: 680, avg_segment_value: 875.30 },
    { loyalty_segment: 'High Switcher', customer_count: 320, avg_segment_value: 650.45 },
  ]
}

let pool: ConnectionPool | null = null

export async function queryAzureSQL(sql: string, jwt: any) {
  // For development, return mock data based on SQL query patterns
  if (process.env.NODE_ENV === 'development' || !process.env.DB_SERVER) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (sql.includes('SalesInteractions') && sql.includes('COUNT(*)')) {
      return mockData.transactions
    } else if (sql.includes('product_name')) {
      return mockData.products
    } else if (sql.includes('loyalty_segment')) {
      return mockData.consumers
    }
    
    return []
  }

  // Production database connection
  if (!pool) {
    pool = new ConnectionPool({
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      server:   process.env.DB_SERVER,
      database: process.env.DB_NAME,
      options:  { encrypt: true },
    })
  }

  if (!pool.connected) await pool.connect()
  const result = await pool.request().query(sql)
  return result.recordset
}