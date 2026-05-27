import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Users, Clock, Radar, Shield, Cpu, FileText, Rocket, Settings, Lock, Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/accounts', label: 'Free Accounts', icon: Users },
  { to: '/crons', label: 'Cron Jobs', icon: Clock },
  { to: '/scanners', label: 'Scanners', icon: Radar },
  { to: '/security', label: 'Security', icon: Shield },
  { to: '/gpu', label: 'GPU Orchestrator', icon: Cpu },
  { to: '/logs', label: 'System Logs', icon: FileText },
  { to: '/deployments', label: 'Deployments', icon: Rocket },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/admin', label: 'Admin', icon: Lock },
]

export default function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-royal-900/95 border-r border-gold-500/10 transform transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gold-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-tight">Automation Hub</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Kingdom Control Center</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to} to={to} end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold-500/10">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-500">All systems operational</span>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <main className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-kingdom-dark/80 backdrop-blur border-b border-gold-500/10 px-6 py-3 flex items-center justify-between">
          <button className="lg:hidden p-2 text-gray-400" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-xs text-gray-500">update.kckngdm.com</span>
          <span className="badge-green text-[10px]">Online</span>
        </header>
        <div className="p-6 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
