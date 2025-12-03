import { useState } from 'react'
import { exportLinks } from '../lib/api'

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExport() {
    try {
      setIsExporting(true)
      setError(null)

      const url = await exportLinks()

      // abre o CSV em nova aba / inicia download
      window.open(url, '_blank')
    } catch (err) {
      console.error(err)
      setError('Não foi possível exportar o CSV. Tente novamente.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="flex items-center gap-2 rounded-lg border border-[#C6CBD6] px-3 py-1 text-xs text-[#20222A] transition-colors hover:bg-[#F4F7FB] disabled:opacity-60"
      >
        <img src="/icons/download.png" className="h-4 w-4" />
        <span>{isExporting ? 'Exportando...' : 'Baixar CSV'}</span>
      </button>

      {error && (
        <p className="text-[10px] text-[#E73D4D]">
          {error}
        </p>
      )}
    </div>
  )
}
