import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Cpu, Shield, Clock, Radar, Rocket, TrendingUp, AlertTriangle, Check } from 'lucide-react'
import { loadStore } from '../lib/store'

export default function Dashboard() {
  const [store, setStore] = useState(null)
  const navigate = useNavigate()

  useEffect(() => { setStore(loadStore()) }, [])
  if (!store) return null

  const services = store.services || []
  const crons = store.crons || []
  const apps = store.apps || []

  const activeServices = services.filter(s => s.status === 'active').length
  const activeCrons = crons.filter(c => c.status === 'active').length
  const deployedApps = apps.filter(a => a.status === 'deployed').length

  // Capacity by category
  const categories = {}
  services.forEach(s => {
    if (!categories[s.category]) categories[s.category] = { total: 0, used: 0 }
    categories[s.category].total += s.maxDaily
    categories[s.category].used += s.used
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Automation Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Central control for all Kingdom services and automations</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card cursor-pointer hover:border-gold-500/30" onClick={() => navigate('/accounts')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase">Active Services</span>
            <Mail className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white">{activeServices}<span className="text-sm text-gray-500">/{services.length}</span></p>
        </div>
        <div className="stat-card cursor-pointer hover:border-gold-500/30" onClick={() => navigate('/crons')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase">Cron Jobs</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{activeCrons}<span className="text-sm text-gray-500">/{crons.length}</span></p>
        </div>
        <div className="stat-card cursor-pointer hover:border-gold-500/30" onClick={() => navigate('/deployments')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase">Deployed Apps</span>
            <Rocket className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-bold text-white">{deployedApps}<span className="text-sm text-gray-500">/{apps.length}</span></p>
        </div>
        <div className="stat-card cursor-pointer hover:border-gold-500/30" onClick={() => navigate('/security')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase">Security</span>
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-lg font-bold text-emerald-400">All Clear</p>
        </div>
      </div>

      {/* Capacity overview */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">Daily Capacity by Category</h3>
        <div className="space-y-3">
          {Object.entries(categories).map(([cat, data]) => {
            const pct = data.total > 0 ? (data.used / data.total) * 100 : 0
            const colors = { email: '#3B82F6', ai: '#A855F7', hosting: '#22C55E', fax: '#EC4899', database: '#F59E0B', cdn: '#06B6D4' }
            return (
              <div key={cat}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-300 capitalize">{cat}</span>
                  <span className="text-white">{data.used.toLocaleString()} / {data.total.toLocaleString()} ({pct.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-2 bg-royal-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: colors[cat] || '#888' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent cron runs */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-white mb-4">Recent Cron Runs</h3>
          <div className="space-y-2">
            {crons.slice(0, 5).map(cron => (
              <div key={cron.id} className="flex items-center justify-between p-2 rounded-lg bg-royal-800/30">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${cron.status === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                  <div>
                    <p className="text-sm text-white">{cron.name}</p>
                    <p className="text-[10px] text-gray-500">{cron.schedule}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{new Date(cron.lastRun).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-white mb-4">Kingdom Apps</h3>
          <div className="space-y-2">
            {apps.slice(0, 7).map(app => (
              <div key={app.id} className="flex items-center justify-between p-2 rounded-lg bg-royal-800/30">
                <div className="flex items-center gap-3">
                  <span>{app.icon}</span>
                  <div>
                    <p className="text-sm text-white">{app.name}</p>
                    <p className="text-[10px] text-gray-500">{app.domain}</p>
                  </div>
                </div>
                <span className={`badge text-[10px] ${app.status === 'deployed' ? 'badge-green' : 'badge-yellow'}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
