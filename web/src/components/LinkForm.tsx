import { useState } from 'react'
import { createLink, type Link } from '../lib/api'

interface LinkFormProps {
  onCreateSuccess?: (link: Link) => void
}

export function LinkForm({ onCreateSuccess }: LinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortCode, setShortCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!originalUrl.trim()) {
      setErrorMessage('Informe uma URL válida.')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage(null)

      const newLink = await createLink({
        originalUrl,
        shortCode: shortCode || undefined,
      })

      // limpa campos
      setOriginalUrl('')
      setShortCode('')

      // avisa a Home que deu certo
      onCreateSuccess?.(newLink)
    } catch (err) {
      console.error(err)
      setErrorMessage('Não foi possível criar o link. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[#20222A]">Novo link</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* LINK ORIGINAL */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-[#737A87]">
            LINK ORIGINAL
          </label>
          <input
            type="text"
            placeholder="www.exemplo.com.br"
            className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-sm text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>

        {/* LINK ENCURTADO (opcional) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-[#737A87]">
            LINK ENCURTADO
          </label>
          <input
            type="text"
            placeholder="brev.ly/"
            className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-sm text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-[#E73D4D]">{errorMessage}</p>
        )}

        <button
          type="submit"                    
          disabled={isSubmitting}            
          className="mt-2 w-full rounded-lg bg-[#3C4BDD] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f3ec0] disabled:opacity-60"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </button>
      </form>
    </section>
  )
}
