import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-2">404 – Not found</h1>
      <p className="text-slate-300 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded bg-slate-100 text-slate-900 font-medium hover:bg-white transition"
      >
        Go back home
      </Link>
    </div>
  )
}
