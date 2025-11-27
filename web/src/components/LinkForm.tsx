
export function LinkForm() {
  return (

<section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-[#20222A]">Novo link</h2>

          <div className="flex flex-col gap-4">
            {/* Campo: Link original */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-[#737A87]">
                LINK ORIGINAL
              </label>
              <input
                type="text"
                placeholder="www.exemplo.com.br"
                className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-sm text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
              />
            </div>

            {/* Campo: Link encurtado */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-semibold text-[#737A87]">
                LINK ENCURTADO
              </label>
              <input
                type="text"
                placeholder="brev.ly/"
                className="w-full rounded-lg border border-[#C6CBD6] bg-white px-3 py-2 text-sm text-[#20222A] outline-none focus:border-[#3C4BDD] focus:ring-1 focus:ring-[#3C4BDD]"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-[#3C4BDD] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2f3ec0]"
          >
            Salvar link
          </button>
        </section>
  )
}