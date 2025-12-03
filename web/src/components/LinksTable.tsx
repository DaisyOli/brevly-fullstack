import { ExportButton } from './ExportButton'
import type { Link } from '../lib/api'

interface LinksTableProps {
  links: Link[]
  isLoading: boolean
  error: string | null
  onDelete: (shortCode: string) => void | Promise<void>
}

export function LinksTable({ links, isLoading, error, onDelete }: LinksTableProps) {
  const hasLinks = links.length > 0
  const isEmpty = !isLoading && !error && !hasLinks

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#20222A]">Meus links</h2>
        <ExportButton />
      </header>

      <div className="border-t border-[#E5E8EF] pt-4 text-xs text-[#20222A]">
        {isLoading && (
          <p className="text-[#737A87]">Carregando links...</p>
        )}

        {!isLoading && error && (
          <p className="text-[#E73D4D]">{error}</p>
        )}

        {isEmpty && (
          <div className="pt-6 flex flex-col items-center gap-3 text-center text-xs text-[#737A87]">
            <img src="/icons/link.svg" className="h-4 w-4" />
            <span>Ainda não existem links cadastrados</span>
          </div>
        )}

        {!isLoading && !error && hasLinks && (
          <ul className="flex flex-col divide-y divide-[#E5E8EF]">
            {links.map((link) => (
             <li key={link.id} className="py-3 flex justify-between items-center gap-4">
  
  {/* Esquerda — URLs */}
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

  {/* Direita — Acessos, data, botões */}
  <div className="flex flex-col items-end gap-2 text-right">
    <div className="text-[#737A87]">
      <p>{link.clicks} acessos</p>
      <p className="text-[10px]">
        {new Date(link.createdAt).toLocaleDateString()}
      </p>
    </div>

    <div className="flex gap-2">
      {/* Copiar */}
  <button
  type="button"
  onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${link.shortCode}`)}
  className="
    flex h-8 w-8 items-center justify-center 
    rounded-md 
    bg-[#F4F7FB] 
    border border-[#E5E8EF]
    hover:bg-[#E8EDFF] hover:border-[#3C4BDD]
    transition-colors
  "
>
  <img src="/icons/copy.svg" alt="Copiar" className="h-4 w-4" />
</button>


       {/* Excluir */}
  <button
  type="button"
  onClick={() => onDelete(link.shortCode)}
  className="
    flex h-8 w-8 items-center justify-center 
    rounded-md 
    bg-[#F4F7FB] 
    border border-[#E5E8EF]
    hover:border-[#E73D4D] hover:bg-[#FEECEE]
    transition-colors
  "
>
  <img src="/icons/thrash.svg" alt="Excluir" className="h-4 w-4" />
</button>

    </div>
  </div>
</li>
 
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
