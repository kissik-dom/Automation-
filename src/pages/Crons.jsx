import { useState, useEffect } from 'react'
import { Clock, Play, Pause, Plus, Check, AlertTriangle, RefreshCw } from 'lucide-react'
import { loadStore, saveStore } from '../lib/store'

export default function Crons() {
  const [store, setStore] = useState(null)

  useEffect(() => { setStore(loadStore()) }, [])
  if (!store) return null

  const crons = store.crons || []

  function toggleCron(id) {
    const updated = { ...store }
    const cron = updated.crons.find(c => c.id === id)
    if (cron) cron.status = cron.status === 'active' ? 'paused' : 'active'
    saveStore(updated)
    setStore(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cron Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Scheduled automation tasks across the Kingdom</p>
        </div>
        <button className="btn-gold flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> New Job</button>
      </div>

      <div className="space-y-3">
        {crons.map(cron => (
          <div key={cron.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cron.status === 'active' ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`}>
                  <Clock className={`w-5 h-5 ${cron.status === 'active' ? 'text-emerald-400' : 'text-yellow-400'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{cron.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span className="font-mono bg-royal-800/60 px-2 py-0.5 rounded">{cron.schedule}</span>
                    <span>App: {cron.app}</span>
                    <span className={`badge text-[10px] ${cron.status === 'active' ? 'badge-green' : 'badge-yellow'}`}>{cron.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-outline text-xs flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Run Now
                </button>
                <button onClick={() => toggleCron(cron.id)} className={`p-2 rounded-lg ${cron.status === 'active' ? 'hover:bg-yellow-500/10 text-yellow-400' : 'hover:bg-emerald-500/10 text-emerald-400'}`}>
                  {cron.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-gold-500/10 text-xs">
              <div>
                <span className="text-gray-500">Last Run</span>
                <p className="text-gray-300">{new Date(cron.lastRun).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-500">Next Run</span>
                <p className="text-gray-300">{new Date(cron.nextRun).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
