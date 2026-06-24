import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import Teams from './pages/Teams'

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}