import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Crons from './pages/Crons'
import Scanners from './pages/Scanners'
import Security from './pages/Security'
import GPU from './pages/GPU'
import Logs from './pages/Logs'
import Deployments from './pages/Deployments'
import Settings from './pages/Settings'
import Admin from './pages/Admin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/crons" element={<Crons />} />
        <Route path="/scanners" element={<Scanners />} />
        <Route path="/security" element={<Security />} />
        <Route path="/gpu" element={<GPU />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
