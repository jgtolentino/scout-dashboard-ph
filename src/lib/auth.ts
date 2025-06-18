import type { NextApiRequest } from 'next'

export async function getJwtSession(req: NextApiRequest) {
  // Mock authentication for development
  // In production, implement proper JWT validation
  const authHeader = req.headers.authorization
  
  if (!authHeader) {
    return null
  }
  
  // For development, return a mock session
  return {
    userId: 'mock-user-id',
    email: 'user@example.com',
    role: 'admin'
  }
}