import { ExportButton } from "../components/ExportButton"
import { LinkForm } from "../components/LinkForm"

export function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] px-4 py-8">
      {/* Header com logo */}
      <header className="max-w-5xl mx-auto mb-10">
        <img
          src="/Logo.svg"
          alt="brev.ly"
          className="h-7"
        />
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-5xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Card: Novo link */}
         <LinkForm />

        {/* Card: Meus links (empty state) */}
        <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <header className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#20222A]">Meus links</h2>

            <ExportButton />
          </header>

          {/* linha divisória */}
          <div className="border-t border-[#E5E8EF] pt-10 flex flex-col items-center gap-3 text-center text-xs text-[#737A87]">
            
            <img src="/icons/link.svg" className="h-4 w-4" />
            <span>Ainda não existem links cadastrados</span>
          </div>
        </section>
        </main>
      </div>)
}
