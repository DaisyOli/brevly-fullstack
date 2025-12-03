export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-lg w-full text-center flex flex-col items-center gap-6">
        {/* Imagem 404 */}
        <img 
          src="404.svg" 
          alt="404" 
          className="w-28 h-auto mx-auto"
        />

        {/* Título */}
        <h1 className="text-lg font-semibold text-[#20222A]">
          Link não encontrado
        </h1>

        {/* Descrição */}
        <p className="text-sm text-[#737A87] leading-relaxed max-w-xs">
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. 
          Saiba mais em <a href="/" className="text-[#3C4BDD] hover:underline">brev.ly</a>.
        </p>

        {/* Botão voltar para Home */}
        <a
          href="/"
          className="
            mt-4 px-6 py-2 rounded-lg 
            bg-[#3C4BDD] text-white text-sm font-semibold
            hover:bg-[#2F3EC0] transition-colors
          "
        >
          Voltar para a página inicial
        </a>
      </div>
    </div>
  )
}
