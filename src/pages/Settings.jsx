import { useState } from 'react'
import { Settings as SettingsIcon, Save, Check, Bell, Shield, Clock } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Hub configuration and preferences</p>
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }} className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-semibold ${saved ? 'bg-emerald-500 text-white' : 'btn-gold'}`}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save</>}
        </button>
      </div>

      <div className="card space-y-6">
        <h3 className="font-semibold text-white flex items-center gap-2"><Bell className="w-4 h-4 text-gold-400" /> Notifications</h3>
        <Toggle label="Alert on account limit >80%" desc="Warn when free-tier accounts approach their daily limit" value={true} />
        <Toggle label="Alert on scraper errors" desc="Notify when a scraper encounters rate limiting or errors" value={true} />
        <Toggle label="Daily summary report" desc="Send daily usage summary to email" value={false} />
      </div>

      <div className="card space-y-6">
        <h3 className="font-semibold text-white flex items-center gap-2"><Clock className="w-4 h-4 text-gold-400" /> Automation</h3>
        <Toggle label="Auto-reset daily limits" desc="Reset all account counters at midnight UTC" value={true} />
        <Toggle label="Auto-failover email providers" desc="Switch to backup provider when primary is exhausted" value={true} />
        <Toggle label="Auto-scale scrapers" desc="Add concurrent workers when load is low" value={false} />
      </div>

      <div className="card space-y-6">
        <h3 className="font-semibold text-white flex items-center gap-2"><Shield className="w-4 h-4 text-gold-400" /> Security</h3>
        <Toggle label="CRYSTALS-Kyber encryption" desc="Use post-quantum key exchange for API communications" value={false} />
        <Toggle label="Auto-rotate API keys" desc="Rotate API keys every 90 days" value={true} />
      </div>
    </div>
  )
}

function Toggle({ label, desc, value }) {
  const [on, setOn] = useState(value)
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <button onClick={() => setOn(!on)} className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-gold-500' : 'bg-royal-600'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )
}
