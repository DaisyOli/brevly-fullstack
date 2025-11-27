import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Redirect } from './pages/Redirect'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Página de redirecionamento com parâmetro dinâmico */}
        <Route path="/:shortCode" element={<Redirect />} />

        {/* Qualquer outra rota cai aqui */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
