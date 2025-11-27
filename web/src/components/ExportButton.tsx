export function ExportButton() {
  return (
    <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-[#C6CBD6] px-3 py-1 text-xs text-[#20222A] transition-colors hover:bg-[#F4F7FB]"
            >
          
              <img src="/icons/download.png" className="h-4 w-4" />
              <span>Baixar CSV</span>
            </button>
  )
}