import { ExportButton } from "../components/ExportButton"
import { LinkForm } from "../components/LinkForm"
import { useEffect, useState } from "react"
import { listLinks, type Link } from "../lib/api"

export function Home() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLinks() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await listLinks()
        setLinks(data)
      } catch (err) {
        console.error(err)
        setError('Não foi possível carregar os links.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [])

    return (
    <div className="min-h-screen bg-[#F4F7FB] px-4 py-8">
      {/* Header com logo */}
      <header className="max-w-5xl mx-auto mb-10">
        <img src="/Logo.svg" alt="brev.ly" className="h-7" />
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card: Novo link */}
        <LinkForm />

        {/* Card: Meus links */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#20222A]">Meus links</h2>

            <ExportButton />
          </header>

          <div className="border-t border-[#E5E8EF] pt-4 text-xs text-[#20222A]">
            {isLoading && <p className="text-[#737A87]">Carregando links...</p>}

            {!isLoading && error && (
              <p className="text-[#E73D4D]">{error}</p>
            )}

            {!isLoading && !error && links.length === 0 && (
              <div className="pt-6 flex flex-col items-center gap-3 text-center text-xs text-[#737A87]">
                <img src="/icons/link.svg" className="h-4 w-4" />
                <span>Ainda não existem links cadastrados</span>
              </div>
            )}

            {!isLoading && !error && links.length > 0 && (
              <ul className="flex flex-col divide-y divide-[#E5E8EF]">
                {links.map((link) => (
                  <li key={link.id} className="py-3 flex justify-between">
                    <div className="flex flex-col">
                      <a
                        href={`${import.meta.env.VITE_FRONTEND_URL}/${link.shortCode}`}
                        className="text-[#3C4BDD] hover:underline"
                      >
                        brev.ly/{link.shortCode}
                      </a>
                      <span className="text-[#737A87]">
                        {link.originalUrl}
                      </span>
                    </div>

                    <div className="text-right text-[#737A87]">
                      <p>{link.clicks} acessos</p>
                      <p className="text-[10px]">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
