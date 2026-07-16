import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ConceptosBasicos from './pages/ConceptosBasicos'
import Ejercicio from './pages/Ejercicio'
import IntegracionCodex from './pages/IntegracionCodex'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/conceptos-basicos" replace />} />
        <Route path="conceptos-basicos" element={<ConceptosBasicos />} />
        <Route path="ejercicio" element={<Ejercicio />} />
        <Route path="integracion-codex" element={<IntegracionCodex />} />
      </Route>
    </Routes>
  )
}
