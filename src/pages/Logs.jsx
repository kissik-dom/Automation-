import { useState } from 'react'
import { FileText, Filter, Download, Trash2 } from 'lucide-react'

const SAMPLE_LOGS = [
  { ts: new Date(Date.now() - 300000).toISOString(), level: 'info', service: 'Email Command', message: 'Email sent via Brevo to broker@example.com — hash: a1b2c3...' },
  { ts: new Date(Date.now() - 600000).toISOString(), level: 'info', service: 'Cron', message: 'Email Sequence Processor completed — 3 follow-ups queued' },
  { ts: new Date(Date.now() - 1200000).toISOString(), level: 'warn', service: 'Accounts', message: 'Brevo account royal@kissikingdom.com at 80% daily limit' },
  { ts: new Date(Date.now() - 1800000).toISOString(), level: 'info', service: 'Gazette', message: 'Notice RKG-2026-0003 published — Notice of Default' },
  { ts: new Date(Date.now() - 3600000).toISOString(), level: 'info', service: 'Security', message: 'Daily security scan completed — 0 threats detected' },
  { ts: new Date(Date.now() - 7200000).toISOString(), level: 'error', service: 'Scanner', message: 'Sotheby\'s scraper rate-limited — backing off 60s' },
  { ts: new Date(Date.now() - 10800000).toISOString(), level: 'info', service: 'Cron', message: 'Account Limit Reset — all daily counters reset to 0' },
  { ts: new Date(Date.now() - 14400000).toISOString(), level: 'info', service: 'Vercel', message: 'Deployment dpl_xyz successful — royal-email-command' },
]

export default function Logs() {
  const [filter, setFilter] = useState('all')

  const levels = ['all', 'info', 'warn', 'error']
  const filtered = filter === 'all' ? SAMPLE_LOGS : SAMPLE_LOGS.filter(l => l.level === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Activity log across all Kingdom services</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline text-xs flex items-center gap-2"><Download className="w-3 h-3" /> Export</button>
          <button className="btn-outline text-xs flex items-center gap-2 text-red-400 border-red-500/30"><Trash2 className="w-3 h-3" /> Clear</button>
        </div>
      </div>

      <div className="flex gap-2">
        {levels.map(l => (
          <button key={l} onClick={() => setFilter(l)} className={`px-3 py-1.5 rounded-lg text-xs capitalize ${filter === l ? 'bg-gold-500/20 text-gold-400' : 'text-gray-500 hover:text-white'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="font-mono text-xs divide-y divide-gold-500/5">
          {filtered.map((log, i) => (
            <div key={i} className="flex items-start gap-4 px-4 py-2.5 hover:bg-royal-800/30">
              <span className="text-gray-600 whitespace-nowrap">{new Date(log.ts).toLocaleTimeString()}</span>
              <span className={`uppercase text-[10px] font-bold w-10 flex-shrink-0 ${
                log.level === 'error' ? 'text-red-400' : log.level === 'warn' ? 'text-yellow-400' : 'text-emerald-400'
              }`}>{log.level}</span>
              <span className="text-gold-400 w-24 flex-shrink-0">{log.service}</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
