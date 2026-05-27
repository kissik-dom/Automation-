import { Lock, Download, Upload, Trash2, RefreshCw, Database, AlertTriangle, Check, X } from 'lucide-react'
import { useState } from 'react'

export default function Admin() {
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-gray-500 text-sm mt-1">System administration and data management</p>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-4">System Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div><p className="text-xs text-gray-500">Uptime</p><p className="text-xl font-bold text-emerald-400">99.9%</p></div>
          <div><p className="text-xs text-gray-500">API Calls Today</p><p className="text-xl font-bold text-white">1,247</p></div>
          <div><p className="text-xs text-gray-500">Errors (24h)</p><p className="text-xl font-bold text-gold-400">3</p></div>
          <div><p className="text-xs text-gray-500">Storage Used</p><p className="text-xl font-bold text-white">12.4 MB</p></div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-4">Data Management</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn-outline text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export All Data</button>
          <button className="btn-outline text-sm flex items-center gap-2"><Upload className="w-4 h-4" /> Import Data</button>
          <button className="btn-outline text-sm flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Sync All Accounts</button>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} className="text-sm flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" /> Reset Hub
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Are you sure?</span>
              <button onClick={() => { localStorage.clear(); location.reload() }} className="p-2 rounded bg-red-500/20 text-red-400"><Check className="w-4 h-4" /></button>
              <button onClick={() => setConfirmReset(false)} className="p-2 rounded bg-royal-700 text-gray-400"><X className="w-4 h-4" /></button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-white mb-4">Connected Services</h3>
        <div className="space-y-2 text-sm">
          {[
            { name: 'GitHub', status: 'connected', detail: 'kissik-dom' },
            { name: 'Vercel', status: 'connected', detail: 'yums-projects-e09fdaf7' },
            { name: 'Brevo', status: 'connected', detail: '14 sender accounts' },
            { name: 'Resend', status: 'connected', detail: '14 sender accounts' },
            { name: 'Groq', status: 'connected', detail: 'Llama 3.3 70B' },
            { name: 'SambaNova', status: 'connected', detail: 'Llama 3.1 70B' },
            { name: 'Fax.Plus', status: 'pending', detail: 'Awaiting setup' },
            { name: 'Supabase', status: 'pending', detail: 'Awaiting setup' },
          ].map(svc => (
            <div key={svc.name} className="flex items-center justify-between p-3 rounded-lg bg-royal-800/30">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${svc.status === 'connected' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                <span className="text-white">{svc.name}</span>
                <span className="text-gray-500">— {svc.detail}</span>
              </div>
              <span className={`badge text-[10px] ${svc.status === 'connected' ? 'badge-green' : 'badge-yellow'}`}>{svc.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
