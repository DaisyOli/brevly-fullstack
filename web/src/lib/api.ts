const API_BASE_URL = import.meta.env.VITE_BACKEND_URL 

export interface Link {
  id: string
  originalUrl: string
  shortCode: string
  clicks: number
  createdAt: string
}

export interface CreateLinkInput {
  originalUrl: string
  shortCode?: string
}

export async function createLink(input: CreateLinkInput): Promise<Link> {
  const response = await fetch(`${API_BASE_URL}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('Failed to create link:', response.status, errorText)
    throw new Error('Failed to create link')
  }

  const data = (await response.json()) as Link
  return data
}

export async function listLinks(): Promise<Link[]> {
  const response = await fetch(`${API_BASE_URL}/links`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('Failed to fetch links:', response.status, errorText)
    throw new Error('Failed to fetch links')
  }
  
  const data = (await response.json()) as Link[]
  return data
}
