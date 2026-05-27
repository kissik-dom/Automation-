import { useState, useEffect } from 'react'
import { Rocket, ExternalLink, GitBranch, Clock, Check, AlertTriangle } from 'lucide-react'
import { loadStore } from '../lib/store'

export default function Deployments() {
  const [store, setStore] = useState(null)

  useEffect(() => { setStore(loadStore()) }, [])
  if (!store) return null

  const apps = store.apps || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Kingdom Deployments</h1>
        <p className="text-gray-500 text-sm mt-1">All {apps.length} apps across the ecosystem</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map(app => (
          <div key={app.id} className="card hover:border-gold-500/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{app.icon}</span>
                <h3 className="font-semibold text-white text-sm">{app.name}</h3>
              </div>
              <span className={`badge text-[10px] ${app.status === 'deployed' ? 'badge-green' : 'badge-yellow'}`}>{app.status}</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-400">
                <ExternalLink className="w-3 h-3" />
                <span className="text-gold-400">{app.domain}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <GitBranch className="w-3 h-3" />
                <span>{app.framework}</span>
              </div>
            </div>
            <button className="btn-outline text-xs w-full mt-4">
              <Rocket className="w-3 h-3 inline mr-1" /> View Deployment
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
