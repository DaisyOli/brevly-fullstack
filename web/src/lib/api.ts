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

export interface ExportLinksResult {
  url: string
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

export async function deleteLink(shortCode: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/links/${shortCode}`, {
    method: 'DELETE',
    })


  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('Failed to delete link:', response.status, errorText)
    throw new Error('Failed to delete link')
  } 
}

export async function exportLinks(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/links/export`, {
    method: 'POST',
  })

  const rawText = await response.text()

  if (!response.ok) {
    console.error('Failed to export links:', response.status, rawText)
    throw new Error('Failed to export links')
  }

  // 1) tenta tratar como JSON com algum campo de URL
  try {
    const data = JSON.parse(rawText)

    const url =
      (data.url as string | undefined) ??
      (data.fileUrl as string | undefined) ??
      (data.downloadUrl as string | undefined)

    if (url && typeof url === 'string') {
      return url
    }
  } catch {
    // não era JSON, segue o baile
  }

  // 2) se não for JSON, tenta usar o texto puro como URL
  if (rawText && rawText.trim().startsWith('http')) {
    return rawText.trim()
  }

  // 3) se chegou aqui, a resposta não tem URL útil
  throw new Error('Resposta da exportação não contém uma URL válida')
}
