import { Shield, Lock, Key, AlertTriangle, Check, RefreshCw } from 'lucide-react'

export default function Security() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Security Center</h1>
        <p className="text-gray-500 text-sm mt-1">CRYSTALS-Kyber post-quantum security + monitoring</p>
      </div>

      {/* Status overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card text-center border-emerald-500/20">
          <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-emerald-400">All Clear</h3>
          <p className="text-xs text-gray-500 mt-1">No threats detected</p>
        </div>
        <div className="card text-center">
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-7 h-7 text-blue-400" />
          </div>
          <h3 className="font-semibold text-white">CRYSTALS-Kyber</h3>
          <p className="text-xs text-gray-500 mt-1">Post-quantum encryption ready</p>
        </div>
        <div className="card text-center">
          <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
            <Key className="w-7 h-7 text-purple-400" />
          </div>
          <h3 className="font-semibold text-white">14 API Keys</h3>
          <p className="text-xs text-gray-500 mt-1">Managed & rotated</p>
        </div>
      </div>

      {/* Security checklist */}
      <div className="card">
        <h3 className="font-semibold text-white mb-4">Security Audit</h3>
        <div className="space-y-3">
          {[
            { check: 'SHA-256 email hashing', status: true },
            { check: 'API key rotation schedule', status: true },
            { check: 'Rate limiting on all endpoints', status: true },
            { check: 'CORS headers configured', status: true },
            { check: 'Environment variables encrypted', status: true },
            { check: 'HTTPS enforced on all domains', status: true },
            { check: 'CRYSTALS-Kyber key exchange', status: false, note: 'Requires implementation' },
            { check: 'Database encryption at rest', status: false, note: 'Pending Supabase setup' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-royal-800/30">
              <div className="flex items-center gap-3">
                {item.status ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
                <span className="text-sm text-white">{item.check}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.note && <span className="text-xs text-gray-500">{item.note}</span>}
                <span className={`badge text-[10px] ${item.status ? 'badge-green' : 'badge-yellow'}`}>
                  {item.status ? 'Passed' : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last scan */}
      <div className="flex items-center justify-between card">
        <div>
          <p className="text-sm text-white">Last security scan</p>
          <p className="text-xs text-gray-500">Today at 03:00 AM</p>
        </div>
        <button className="btn-outline text-sm flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Run Scan Now
        </button>
      </div>
    </div>
  )
}
