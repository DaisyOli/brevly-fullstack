import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>()
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!shortCode) {
      navigate('/', { replace: true })
      return
    }

    async function handleRedirect() {
      try {
        const response = await fetch(`${backendUrl}/${shortCode}`, {
          // não seguir o redirect automaticamente
          redirect: 'manual',
        })

        // se o backend respondeu 404, mostramos erro no front
        if (response.status === 404) {
          setError('Link não encontrado.')
          return
        }

        // qualquer outro status (302, 301, etc) a gente deixa o browser resolver
        window.location.replace(`${backendUrl}/${shortCode}`)
      } catch (err) {
        console.error(err)
        setError('Não foi possível redirecionar o link.')
      }
    }

    handleRedirect()
  }, [shortCode, backendUrl, navigate])

  // Se deu erro, mostramos uma “404 de link” aqui mesmo
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm px-8 py-10 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            <img src="/Logo.svg" alt="brev.ly" className="h-6" />
          </div>

          <h1 className="text-xl font-semibold text-[#20222A] mb-2">
            Link não encontrado
          </h1>

          <p className="text-xs text-[#737A87] mb-6">
            O link que você tentou acessar não existe, foi removido
            ou está digitado incorretamente.
          </p>

          <button
            type="button"
            onClick={() => navigate('/', { replace: true })}
            className="inline-flex items-center justify-center rounded-lg bg-[#3C4BDD] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2f3ec0]"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    )
  }

  // Enquanto decide -> tela de “Redirecionando...”
  return (
    <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm px-8 py-10 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <img src="/Logo.svg" alt="brev.ly" className="h-6" />
        </div>

        <h1 className="text-xl font-semibold text-[#20222A] mb-2">
          Redirecionando...
        </h1>

        <p className="text-xs text-[#737A87]">
          O link será aberto automaticamente em alguns instantes.
        </p>
      </div>
    </div>
  )
}
