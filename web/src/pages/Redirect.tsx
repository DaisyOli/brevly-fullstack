import { useParams } from 'react-router-dom'

export function Redirect() {
  const { shortCode } = useParams()

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-8">
      <h1 className="text-2xl font-bold">Redirect page</h1>
      <p className="mt-2 text-slate-300">
        Here we will handle the redirect for: <span className="font-mono">{shortCode}</span>
      </p>
    </div>
  )
}
