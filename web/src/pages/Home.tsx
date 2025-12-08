import { LinkForm } from "../components/LinkForm"
import { useEffect, useState } from "react"
import { listLinks, deleteLink, type Link } from "../lib/api"
import { LinksTable } from '../components/LinksTable'


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

async function handleCreateSuccess(newLink: Link) {
    setLinks((prevLinks) => [newLink, ...prevLinks])
  }

async function handleDeleteLink(shortCode: string) {
    try {
      await deleteLink(shortCode)

      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.shortCode !== shortCode),
      )
    } catch (err) {
      console.error(err)
      alert("Não foi possível deletar o link. Tente novamente.")
    }
  } 

  return (
  <div className="min-h-screen bg-[#F4F7FB] px-4 pt-8 pb-10 md:pt-14 md:pb-10">
    {/* Header com logo */}
    <header className="max-w-6xl mx-auto mb-10 flex justify-center md:justify-start">
      <img src="/Logo.svg" alt="brev.ly" className="h-7" />
    </header>

    {/* Conteúdo principal */}
    <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.3fr_2fr] gap-8 items-start">
      {/* Coluna 1: formulário */}
      <LinkForm onCreateSuccess={handleCreateSuccess} />

      {/* Coluna 2: tabela */}
      <LinksTable
        links={links}
        isLoading={isLoading}
        error={error}
        onDelete={handleDeleteLink}
      />
    </main>
  </div>
)



}
