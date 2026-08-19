import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import Teams from './pages/Teams'
import { Matches } from './pages/Matches'
import { Tournament } from './pages/Tournament'

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/tournaments" element={<Tournament />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}