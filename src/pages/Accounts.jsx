import { useState, useEffect } from 'react'
import { Users, RefreshCw, AlertTriangle, Check } from 'lucide-react'
import { loadStore, FREE_SERVICES } from '../lib/store'

export default function Accounts() {
  const [store, setStore] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => { setStore(loadStore()) }, [])
  if (!store) return null

  const services = store.services || FREE_SERVICES
  const categories = [...new Set(services.map(s => s.category))]
  const filtered = filter === 'all' ? services : services.filter(s => s.category === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Free Tier Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">Track usage across {services.length} free service accounts</p>
        </div>
        <button className="btn-outline text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh All
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs capitalize ${filter === 'all' ? 'bg-gold-500/20 text-gold-400' : 'text-gray-500 hover:text-white'}`}>All ({services.length})</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-lg text-xs capitalize ${filter === cat ? 'bg-gold-500/20 text-gold-400' : 'text-gray-500 hover:text-white'}`}>
            {cat} ({services.filter(s => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* Account cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(svc => {
          const pct = svc.maxDaily > 0 ? (svc.used / svc.maxDaily) * 100 : 0
          const isWarning = pct > 80
          const isExhausted = pct >= 100

          return (
            <div key={svc.id} className={`card ${isExhausted ? 'border-red-500/30' : isWarning ? 'border-yellow-500/20' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{svc.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{svc.service}</h3>
                    <p className="text-[10px] text-gray-500 capitalize">{svc.category}</p>
                  </div>
                </div>
                <span className={`badge text-[10px] ${svc.status === 'active' ? 'badge-green' : 'badge-red'}`}>{svc.status}</span>
              </div>

              <p className="text-xs text-gray-400 font-mono mb-3">{svc.email}</p>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Usage</span>
                  <span className={isExhausted ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-gray-300'}>{svc.used} / {svc.limit}</span>
                </div>
                <div className="w-full h-1.5 bg-royal-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${isExhausted ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>

              {isWarning && !isExhausted && (
                <div className="flex items-center gap-1 text-[10px] text-yellow-400 mt-2">
                  <AlertTriangle className="w-3 h-3" /> Approaching limit
                </div>
              )}
              {isExhausted && (
                <div className="flex items-center gap-1 text-[10px] text-red-400 mt-2">
                  <AlertTriangle className="w-3 h-3" /> Limit reached — will reset at midnight
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
